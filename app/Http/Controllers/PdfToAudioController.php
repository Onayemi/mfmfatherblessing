<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class PdfToAudioController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('PdfToAudio');
    }

    public function about(): Response
    {
        return Inertia::render('public/about');
    }

    public function services(): Response
    {
        return Inertia::render('public/services');
    }

    public function contact(): Response
    {
        return Inertia::render('public/contact');
    }

    public function convert(Request $request)
    {
        $request->validate([
            'pdf_file'     => 'required|mimes:pdf|max:10240', // Max 10MB
            'audio_sample' => 'nullable|mimes:mp3,wav|max:5024',
            'language'     => 'required|string|in:en,es,fr,de,it,pt,hi,zh-cn',
            'slow_speed'   => 'nullable|boolean',
        ]);

        $pdfPath = null;
        $tempTextPath = null;
        $audioSamplePath = null;

        try {
            // -------------------------------------------------------------
            // 1. Store Uploaded Files
            // -------------------------------------------------------------
            $pdfPath = $request->file('pdf_file')->store('uploads/pdfs', 'local');
            $fullPdfPath = Storage::disk('local')->path($pdfPath);

            if ($request->hasFile('audio_sample')) {
                $audioSamplePath = $request->file('audio_sample')->store('uploads/audio_samples', 'local');
            }

            // -------------------------------------------------------------
            // 2. Resolve pdftotext.exe Path Directly
            // -------------------------------------------------------------
            $pdftotextBinary = env('PDFTOTEXT_PATH');

            if (!$pdftotextBinary || !file_exists($pdftotextBinary)) {
                $possiblePdfPaths = [
                    'C:/poppler/poppler-26.07.0/Library/bin/pdftotext.exe',
                    'C:/poppler/bin/pdftotext.exe',
                    'C:/poppler/Library/bin/pdftotext.exe',
                ];

                $pdftotextBinary = null;
                foreach ($possiblePdfPaths as $path) {
                    if (file_exists($path)) {
                        $pdftotextBinary = $path;
                        break;
                    }
                }

                if (!$pdftotextBinary) {
                    throw new \Exception("pdftotext.exe not found. Please verify your Poppler installation path.");
                }
            }

            // -------------------------------------------------------------
            // 3. Extract Text via Direct Process Execution (No Spatie Wrapper)
            // -------------------------------------------------------------
            $pdfProcess = new Process([
                $pdftotextBinary,
                $fullPdfPath,
                '-' // Output extracted text directly to STDOUT
            ]);
            $pdfProcess->setTimeout(60);
            $pdfProcess->run();

            if (!$pdfProcess->isSuccessful()) {
                throw new ProcessFailedException($pdfProcess);
            }

            $extractedText = $pdfProcess->getOutput();
            $extractedText = trim(preg_replace('/\s+/', ' ', $extractedText));

            if (empty($extractedText)) {
                return back()->withErrors([
                    'pdf_file' => 'Could not extract readable text. The PDF might be image-based or scanned.'
                ]);
            }

            // Truncate to avoid shell argument length overflow
            $extractedText = Str::limit($extractedText, 8000, '');

            // -------------------------------------------------------------
            // 4. Save Extracted Text to Temp File for gTTS Input
            // -------------------------------------------------------------
            $tempTextFilename = 'temp_text_' . Str::uuid() . '.txt';
            Storage::disk('local')->put('temp/' . $tempTextFilename, $extractedText);
            $tempTextPath = Storage::disk('local')->path('temp/' . $tempTextFilename);

            // -------------------------------------------------------------
            // 5. Prepare Output MP3 Destination
            // -------------------------------------------------------------
            $outputFilename = 'generated_' . Str::uuid() . '.mp3';

            if (!Storage::disk('public')->exists('audio')) {
                Storage::disk('public')->makeDirectory('audio');
            }

            $outputAbsolutePath = Storage::disk('public')->path('audio/' . $outputFilename);

            // -------------------------------------------------------------
            // 6. Execute Python gTTS Process Safely
            // -------------------------------------------------------------
            $gttsPath = env('GTTS_PATH');

            if ($gttsPath && file_exists($gttsPath)) {
                $ttsCmd = [$gttsPath];
            } else {
                $ttsCmd = ['python', '-m', 'gtts'];
            }

            $ttsCmd[] = '--file';
            $ttsCmd[] = $tempTextPath;
            $ttsCmd[] = '--lang';
            $ttsCmd[] = $request->input('language', 'en');
            $ttsCmd[] = '--output';
            $ttsCmd[] = $outputAbsolutePath;

            if ($request->boolean('slow_speed')) {
                $ttsCmd[] = '--slow';
            }

            $ttsProcess = new Process($ttsCmd);
            $ttsProcess->setTimeout(180);
            $ttsProcess->run();

            if (!$ttsProcess->isSuccessful()) {
                throw new ProcessFailedException($ttsProcess);
            }

            if (!file_exists($outputAbsolutePath)) {
                throw new \Exception("Audio file generation failed at target path.");
            }

            // -------------------------------------------------------------
            // 7. Cleanup & Return Success
            // -------------------------------------------------------------
            Storage::disk('local')->delete($pdfPath);
            if ($tempTextFilename) {
                Storage::disk('local')->delete('temp/' . $tempTextFilename);
            }
            if ($audioSamplePath) {
                Storage::disk('local')->delete($audioSamplePath);
            }

            return back()->with([
                'audioUrl' => asset('storage/audio/' . $outputFilename),
                'textPreview' => Str::limit($extractedText, 250),
            ]);

        } catch (\Exception $e) {
            if ($tempTextPath && file_exists($tempTextPath)) {
                @unlink($tempTextPath);
            }
            if ($pdfPath) {
                Storage::disk('local')->delete($pdfPath);
            }

            return back()->withErrors([
                'error' => 'Conversion process failed: ' . $e->getMessage()
            ]);
        }
    }
}
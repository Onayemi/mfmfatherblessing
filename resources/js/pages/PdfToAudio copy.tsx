import React from "react";
import { useForm, usePage, Head } from "@inertiajs/react";

interface PageProps {
    audioUrl?: string;
    textPreview?: string;
    errors: Record<string, string>;
}

export default function PdfToAudio() {
    const { audioUrl, textPreview, errors } = usePage()
        .props as unknown as PageProps;

    const { data, setData, post, processing, progress } = useForm<{
        pdf_file: File | null;
        audio_sample: File | null;
        language: string;
        slow_speed: boolean;
    }>({
        pdf_file: null,
        audio_sample: null,
        language: "en",
        slow_speed: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.pdf_file) return;

        // post(route("pdf-to-audio.convert"), {
        post("/pdf-to-audio/convert", {
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="PDF to MP3 Audio Converter" />

            <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h1 className="text-center text-3xl font-extrabold text-slate-900">
                        PDF to Audio MP3
                    </h1>
                    <p className="mt-2 text-center text-sm text-slate-600">
                        Convert PDF text into playable MP3 speech using gTTS
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
                    <div className="bg-white py-8 px-6 shadow sm:rounded-lg">
                        {/* Flash Errors */}
                        {Object.keys(errors).length > 0 && (
                            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded text-sm space-y-1">
                                {Object.values(errors).map((err, idx) => (
                                    <p key={idx}>{err}</p>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* PDF Input */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Upload PDF File{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) =>
                                        setData(
                                            "pdf_file",
                                            e.target.files?.[0] || null,
                                        )
                                    }
                                    className="block w-full text-sm text-slate-500
                                               file:mr-4 file:py-2 file:px-4
                                               file:rounded-md file:border-0
                                               file:text-sm file:font-semibold
                                               file:bg-indigo-50 file:text-indigo-700
                                               hover:file:bg-indigo-100 cursor-pointer"
                                    required
                                />
                            </div>

                            {/* Reference MP3 Input */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Upload Audio Sample / Reference (.mp3)
                                </label>
                                <input
                                    type="file"
                                    accept=".mp3,.wav"
                                    onChange={(e) =>
                                        setData(
                                            "audio_sample",
                                            e.target.files?.[0] || null,
                                        )
                                    }
                                    className="block w-full text-sm text-slate-500
                                               file:mr-4 file:py-2 file:px-4
                                               file:rounded-md file:border-0
                                               file:text-sm file:font-semibold
                                               file:bg-slate-100 file:text-slate-700
                                               hover:file:bg-slate-200 cursor-pointer"
                                />
                            </div>

                            {/* Language */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Speech Output Language
                                </label>
                                <select
                                    value={data.language}
                                    onChange={(e) =>
                                        setData("language", e.target.value)
                                    }
                                    className="block w-full border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                    <option value="it">Italian</option>
                                    <option value="pt">Portuguese</option>
                                    <option value="hi">Hindi</option>
                                    <option value="zh-cn">
                                        Chinese (Mandarin)
                                    </option>
                                </select>
                            </div>

                            {/* Slow Speech Speed */}
                            <div className="flex items-center">
                                <input
                                    id="slow_speed"
                                    type="checkbox"
                                    checked={data.slow_speed}
                                    onChange={(e) =>
                                        setData("slow_speed", e.target.checked)
                                    }
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                                />
                                <label
                                    htmlFor="slow_speed"
                                    className="ml-2 block text-sm text-slate-700"
                                >
                                    Use slower speech rate
                                </label>
                            </div>

                            {/* Upload Progress */}
                            {progress && (
                                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${progress.percentage}%`,
                                        }}
                                    ></div>
                                </div>
                            )}

                            {/* Convert Button */}
                            <button
                                type="submit"
                                disabled={processing || !data.pdf_file}
                                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                {processing
                                    ? "Processing Document..."
                                    : "Convert PDF to Audio MP3"}
                            </button>
                        </form>

                        {/* Player Preview */}
                        {audioUrl && (
                            <div className="mt-8 p-5 bg-emerald-50 border border-emerald-200 rounded-lg space-y-3">
                                <h3 className="text-base font-semibold text-emerald-900">
                                    Audio Generated Successfully!
                                </h3>

                                {textPreview && (
                                    <div className="text-xs text-slate-600 bg-white p-3 rounded border border-slate-200">
                                        <span className="font-semibold block text-slate-700 mb-1">
                                            Text Extracted from PDF:
                                        </span>
                                        "{textPreview}..."
                                    </div>
                                )}

                                <audio
                                    controls
                                    className="w-full"
                                    src={audioUrl}
                                >
                                    Your browser does not support audio
                                    playback.
                                </audio>

                                <a
                                    href={audioUrl}
                                    download
                                    className="inline-block text-center w-full py-2 px-4 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md transition-colors"
                                >
                                    Download MP3 Audio
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

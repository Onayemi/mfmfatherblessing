import React, { useState, useRef } from "react";
import { useForm, usePage, Head } from "@inertiajs/react";

interface PageProps {
    audioUrl?: string;
    textPreview?: string;
    errors: Record<string, string>;
}

export default function PdfToAudio() {
    const { audioUrl, textPreview, errors } = usePage()
        .props as unknown as PageProps;
    const [isDragging, setIsDragging] = useState(false);
    const pdfInputRef = useRef<HTMLInputElement>(null);
    const audioInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, progress, reset } = useForm<{
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

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type === "application/pdf") {
                setData("pdf_file", file);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.pdf_file) return;

        // post(route("pdf-to-audio.convert"), {
        post("/pdf-to-audio/convert", {
            forceFormData: true,
        });
    };

    const handleReset = () => {
        reset();
        if (pdfInputRef.current) pdfInputRef.current.value = "";
        if (audioInputRef.current) audioInputRef.current.value = "";
    };

    return (
        <>
            <Head title="PDF to MP3 Audio Converter" />

            <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
                {/* Header Header Section */}
                <div className="max-w-xl text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-600 rounded-2xl mb-4 shadow-sm">
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                        PDF to Audio MP3
                    </h1>
                    <p className="mt-2 text-base text-slate-600">
                        Convert document text into natural-sounding speech with
                        downloadable MP3 audio.
                    </p>
                </div>

                {/* Main Card Container */}
                <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl border border-slate-100 overflow-hidden">
                    <div className="p-6 sm:p-8">
                        {/* Error Flash Messages */}
                        {Object.keys(errors).length > 0 && (
                            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg space-y-1">
                                <div className="flex items-center text-red-800 font-semibold text-sm mb-1">
                                    <svg
                                        className="w-4 h-4 mr-2 fill-current"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
                                    </svg>
                                    Conversion Failed
                                </div>
                                {Object.values(errors).map((err, idx) => (
                                    <p
                                        key={idx}
                                        className="text-xs text-red-700 pl-6"
                                    >
                                        {err}
                                    </p>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Drag and Drop Zone for PDF */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-800 mb-2">
                                    PDF Document{" "}
                                    <span className="text-rose-500">*</span>
                                </label>
                                <div
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setIsDragging(true);
                                    }}
                                    onDragLeave={() => setIsDragging(false)}
                                    onDrop={handleFileDrop}
                                    onClick={() => pdfInputRef.current?.click()}
                                    className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
                                        isDragging
                                            ? "border-indigo-500 bg-indigo-50/50"
                                            : data.pdf_file
                                              ? "border-emerald-400 bg-emerald-50/30"
                                              : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                                    }`}
                                >
                                    <input
                                        ref={pdfInputRef}
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) =>
                                            setData(
                                                "pdf_file",
                                                e.target.files?.[0] || null,
                                            )
                                        }
                                        className="hidden"
                                    />

                                    {data.pdf_file ? (
                                        <div className="flex items-center justify-between text-left">
                                            <div className="flex items-center space-x-3 truncate">
                                                <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-lg">
                                                    <svg
                                                        className="w-6 h-6"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="truncate">
                                                    <p className="text-sm font-medium text-slate-900 truncate">
                                                        {data.pdf_file.name}
                                                    </p>
                                                    <p className="text-xs text-slate-500">
                                                        {(
                                                            data.pdf_file.size /
                                                            (1024 * 1024)
                                                        ).toFixed(2)}{" "}
                                                        MB
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setData("pdf_file", null);
                                                }}
                                                className="text-slate-400 hover:text-slate-600 p-1"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <svg
                                                className="mx-auto h-10 w-10 text-slate-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                />
                                            </svg>
                                            <div className="text-sm text-slate-600">
                                                <span className="font-semibold text-indigo-600 hover:underline">
                                                    Click to upload
                                                </span>{" "}
                                                or drag and drop
                                            </div>
                                            <p className="text-xs text-slate-400">
                                                PDF documents up to 10MB
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Optional Audio Reference Input */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Reference Audio File{" "}
                                    <span className="text-slate-400 font-normal">
                                        (Optional .mp3 / .wav)
                                    </span>
                                </label>
                                <input
                                    ref={audioInputRef}
                                    type="file"
                                    accept=".mp3,.wav"
                                    onChange={(e) =>
                                        setData(
                                            "audio_sample",
                                            e.target.files?.[0] || null,
                                        )
                                    }
                                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                                />
                            </div>

                            {/* Controls Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                {/* Language Picker */}
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                                        Voice Language
                                    </label>
                                    <select
                                        value={data.language}
                                        onChange={(e) =>
                                            setData("language", e.target.value)
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
                                    >
                                        <option value="en">English (US)</option>
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

                                {/* Reading Speed */}
                                <div className="flex items-center sm:pt-6">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.slow_speed}
                                            onChange={(e) =>
                                                setData(
                                                    "slow_speed",
                                                    e.target.checked,
                                                )
                                            }
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        <span className="ml-3 text-sm font-medium text-slate-700">
                                            Slower speech rate
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Progress Indicator */}
                            {progress && (
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium text-slate-600">
                                        <span>Uploading file...</span>
                                        <span>{progress.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                            style={{
                                                width: `${progress.percentage}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {/* Submit & Reset buttons */}
                            <div className="flex items-center space-x-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={processing || !data.pdf_file}
                                    className="flex-1 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Extracting & Synthesizing Speech...
                                        </span>
                                    ) : (
                                        "Convert to MP3 Audio"
                                    )}
                                </button>
                                {data.pdf_file && (
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        disabled={processing}
                                        className="py-3 px-4 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 focus:outline-none"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* Audio Result Output Card */}
                        {audioUrl && (
                            <div className="mt-8 pt-6 border-t border-slate-100 space-y-4 animate-fade-in">
                                <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-xl space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <span className="flex h-3 w-3 relative">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                            </span>
                                            <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wide">
                                                Audio Ready
                                            </h3>
                                        </div>
                                    </div>

                                    {textPreview && (
                                        <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-lg border border-emerald-100 text-xs text-slate-600 leading-relaxed">
                                            <span className="font-semibold text-slate-800 block mb-1">
                                                Extracted Excerpt:
                                            </span>
                                            "{textPreview}..."
                                        </div>
                                    )}

                                    {/* Audio Player Controls */}
                                    <audio
                                        controls
                                        className="w-full rounded-lg shadow-sm"
                                        src={audioUrl}
                                    >
                                        Your browser does not support playing
                                        audio.
                                    </audio>

                                    {/* Download Button */}
                                    <a
                                        href={audioUrl}
                                        download
                                        className="flex items-center justify-center w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow transition-colors"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                            />
                                        </svg>
                                        Download MP3 File
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

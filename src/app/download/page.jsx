"use client";

import { useState } from "react";
import {
  Download,
  ShieldCheck,
  Smartphone,
  FileCheck2,
  ChevronDown,
  ExternalLink,
  Info,
  CheckCircle2,
} from "lucide-react";

const APK_URL =
 "https://drive.google.com/file/d/1A3Whwmh2XYGsstXs7Hc55PUMSEMNaYT8/view?usp=sharing" || "#";

const appInfo = {
  version: "1.0.5",
  size: "10 MB",
  updated: "28 August 2026",
  platform: "Android/IOS",
  developer: "NOTIYA",
  checksum: "EE7E4D23767B1EB5894849E36AA02F89C33C6D48E5189CF8C026D3E5A9D3A8AA",
};

export default function DownloadApp() {
  const [showDetails, setShowDetails] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);

  const handleDownload = () => {
    setDownloadStarted(true);

    setTimeout(() => {
      window.location.href = APK_URL;
    }, 250);
  };

  return (
    <section
      className="
        relative overflow-hidden
        bg-[#fffaf0] dark:bg-[#17130d]
        px-5 py-16
        sm:px-8 lg:px-12
        transition-colors duration-300
      "
    >

      {/* Background decoration */}
      <div
        className="
          pointer-events-none absolute
          -right-24 -top-24
          h-72 w-72 rounded-full
          bg-[#f59e0b]/10 dark:bg-[#f59e0b]/5
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-32 -left-24
          h-72 w-72 rounded-full
          bg-[#f59e0b]/10 dark:bg-[#f59e0b]/5
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-5xl">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="mx-auto max-w-2xl text-center">

          {/* Android Badge */}
          <div
            className="
              mb-5 inline-flex items-center gap-2
              rounded-full
              border
              border-[#e7d9c3] dark:border-[#3b3328]
              bg-white dark:bg-[#211c15]
              px-4 py-2
              text-sm font-medium
              text-gray-700 dark:text-gray-300
              shadow-sm dark:shadow-none
              transition-colors
            "
          >
            <Smartphone className="h-4 w-4 text-[#f59e0b]" />

            Android/IOS App
          </div>


          {/* Heading */}
          <h2
            className="
              font-serif
              text-4xl font-bold tracking-tight
              text-gray-950 dark:text-white
              sm:text-5xl
            "
          >
            Take NOTIYA
            <br />

            <span className="text-[#f59e0b]">
              with you.
            </span>
          </h2>


          {/* Description */}
          <p
            className="
              mt-5
              text-base leading-7
              text-gray-600 dark:text-gray-400
              sm:text-lg
            "
          >
            Access your B.Tech notes, PYQs, syllabus and
            study resources directly from your Android device.
          </p>

        </div>


        {/* ========================================
            DOWNLOAD CARD
        ======================================== */}

        <div
          className="
            mx-auto mt-10 max-w-3xl overflow-hidden
            rounded-3xl
            border
            border-[#eadfce] dark:border-[#393229]
            bg-white dark:bg-[#211c15]
            shadow-[0_20px_60px_rgba(80,50,20,0.08)]
            dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
            transition-colors duration-300
          "
        >

          <div className="p-6 sm:p-8">


            {/* ========================================
                APP IDENTITY
            ======================================== */}

            <div
              className="
                flex flex-col gap-5
                sm:flex-row sm:items-center
                sm:justify-between
              "
            >

              <div className="flex items-center gap-4">

                {/* N0TIYA Logo */}
                <div
                  className="
                    flex h-16 w-16 shrink-0
                    items-center justify-center
                    rounded-2xl
                    bg-[#fff4dd]
                    dark:bg-[#3a2b14]
                    text-3xl
                  "
                >
                  <img
  src="/logo.svg"
  alt="N0TIYA"
  className="h-16 w-16 object-contain"
/>
                </div>


                <div>

                  <h3
                    className="
                      font-serif
                      text-2xl font-bold
                      text-gray-950 dark:text-white
                    "
                  >
                    NOTIYA
                  </h3>

                  <p
                    className="
                      mt-1 text-sm
                      text-gray-500 dark:text-gray-400
                    "
                  >
                    Official Android Application
                  </p>

                </div>

              </div>


              {/* Verified Badge */}
              <div
                className="
                  flex w-fit items-center gap-2
                  rounded-full
                  bg-green-50 dark:bg-green-950/30
                  px-3 py-1.5
                  text-xs font-semibold
                  text-green-700 dark:text-green-400
                "
              >

                <CheckCircle2 className="h-3.5 w-3.5" />

                Verified Release

              </div>

            </div>


            {/* ========================================
                APP INFORMATION
            ======================================== */}

            <div
              className="
                mt-7
                grid grid-cols-2 gap-3
                sm:grid-cols-4
              "
            >

              <InfoItem
                label="Version"
                value={`v${appInfo.version}`}
              />

              <InfoItem
                label="File size"
                value={appInfo.size}
              />

              <InfoItem
                label="Platform"
                value={appInfo.platform}
              />

              <InfoItem
                label="Updated"
                value={appInfo.updated}
              />

            </div>


            {/* ========================================
                DOWNLOAD BUTTON
            ======================================== */}

            <button
              onClick={handleDownload}
              disabled={downloadStarted}
              className="
                mt-7 flex w-full
                items-center justify-center gap-3
                rounded-2xl
                bg-[#f59e0b]
                px-6 py-4
                text-base font-bold text-white
                shadow-lg shadow-orange-500/20

                transition-all duration-200

                hover:-translate-y-0.5
                hover:bg-[#e99005]

                active:translate-y-0

                disabled:cursor-wait
                disabled:opacity-70
              "
            >

              <Download className="h-5 w-5" />

              {downloadStarted
                ? "Starting download..."
                : "Download N0TIYA APK"}

            </button>


            {/* ========================================
                TRUST MESSAGE
            ======================================== */}

            <div
              className="
                mt-4
                flex items-start gap-3
                rounded-xl
                bg-[#fffaf0]
                dark:bg-[#2a2115]
                p-4
                text-sm
                text-gray-600 dark:text-gray-300
              "
            >

              <ShieldCheck
                className="
                  mt-0.5 h-5 w-5 shrink-0
                  text-green-600 dark:text-green-400
                "
              />

              <p>
                This APK is distributed directly by N0TIYA.
                You may see an Android security prompt because
                the app is currently being distributed outside
                Google Play.
              </p>

            </div>


            {/* ========================================
                DETAILS TOGGLE
            ======================================== */}

            <button
              onClick={() =>
                setShowDetails(!showDetails)
              }
              className="
                mt-5 flex w-full
                items-center justify-between
                border-t
                border-gray-100 dark:border-[#393229]
                pt-5
                text-left text-sm font-semibold
                text-gray-700 dark:text-gray-300
              "
            >

              <span>
                Release & verification details
              </span>

              <ChevronDown
                className={`
                  h-5 w-5
                  transition-transform
                  ${showDetails ? "rotate-180" : ""}
                `}
              />

            </button>


            {/* ========================================
                DETAILS
            ======================================== */}

            {showDetails && (
              <div
                className="
                  mt-5 space-y-4
                  border-t
                  border-gray-100 dark:border-[#393229]
                  pt-5
                "
              >

                <DetailRow
                  icon={<FileCheck2 className="h-4 w-4" />}
                  title="Release"
                  value={`N0TIYA v${appInfo.version}`}
                />

                <DetailRow
                  icon={<Smartphone className="h-4 w-4" />}
                  title="Platform"
                  value="Android"
                />

                <DetailRow
                  icon={<ShieldCheck className="h-4 w-4" />}
                  title="Developer"
                  value={appInfo.developer}
                />


                {/* SHA-256 */}
                <div
                  className="
                    rounded-xl
                    bg-gray-50 dark:bg-[#181511]
                    p-4
                  "
                >

                  <div
                    className="
                      flex items-center gap-2
                      text-sm font-semibold
                      text-gray-800 dark:text-gray-200
                    "
                  >

                    <ShieldCheck className="h-4 w-4" />

                    SHA-256 checksum

                  </div>


                  <p
                    className="
                      mt-2 break-all
                      font-mono text-xs leading-5
                      text-gray-500 dark:text-gray-400
                    "
                  >
                    {appInfo.checksum}
                  </p>

                </div>

              </div>
            )}

          </div>


          {/* ========================================
              BOTTOM INFORMATION
          ======================================== */}

          <div
            className="
              border-t
              border-[#eadfce] dark:border-[#393229]
              bg-[#fffaf0] dark:bg-[#1b1711]
              px-6 py-5 sm:px-8
            "
          >

            <div
              className="
                flex flex-col gap-4
                text-sm
                sm:flex-row sm:items-center
                sm:justify-between
              "
            >

              <div
                className="
                  flex items-center gap-2
                  text-gray-600 dark:text-gray-400
                "
              >

                <Info className="h-4 w-4 text-[#f59e0b]" />

                <span>
                  Currently available as a direct APK.
                </span>

              </div>


              <div className="flex items-center gap-5">

                <a
                  href="/privacy"
                  className="
                    font-medium
                    text-gray-700 dark:text-gray-300
                    underline-offset-4
                    hover:underline
                  "
                >
                  Privacy Policy
                </a>


               

              </div>

            </div>

          </div>

        </div>


        {/* ========================================
            INSTALLATION NOTE
        ======================================== */}

        <div
          className="
            mx-auto mt-6 max-w-3xl
            text-center
            text-xs leading-5
            text-gray-500 dark:text-gray-500
          "
        >

          <p>
            By installing N0TIYA, you agree to the applicable
            terms and privacy policy. For your security, only
            install APK files obtained from the official
            N0TIYA download page.
          </p>

        </div>

      </div>

    </section>
  );
}


/* ========================================
   INFO ITEM
======================================== */

function InfoItem({ label, value }) {
  return (
    <div
      className="
        rounded-xl
        border
        border-gray-100 dark:border-[#393229]
        bg-gray-50 dark:bg-[#181511]
        p-3
      "
    >

      <p className="text-xs text-gray-500 dark:text-gray-500">
        {label}
      </p>

      <p
        className="
          mt-1 text-sm font-semibold
          text-gray-900 dark:text-gray-200
        "
      >
        {value}
      </p>

    </div>
  );
}


/* ========================================
   DETAIL ROW
======================================== */

function DetailRow({ icon, title, value }) {
  return (
    <div className="flex items-center justify-between gap-4">

      <div
        className="
          flex items-center gap-2
          text-sm
          text-gray-600 dark:text-gray-400
        "
      >
        {icon}
        {title}
      </div>

      <span
        className="
          text-sm font-semibold
          text-gray-900 dark:text-gray-200
        "
      >
        {value}
      </span>

    </div>
  );
}
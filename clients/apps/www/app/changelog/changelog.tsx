import Image from "next/image";
import Link from "next/link";
import React from "react";

type ChangelogEntry = {
  date: string;
  title: string;
  description: React.ReactNode;
  version: string;
  screenshot?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

const updates: ChangelogEntry[] = [
  // =================================================================
  {
    date: "20 October 2024",
    title: "Analytics Dashboard, Bug Fixes",
    version: "v0.3.0",
    description: (
      <>
        <h2 className="mt-6 text-xl font-semibold">
          Version 0.3.0 - September 29th Release 🎉
        </h2>
        <p className="mt-2 text-gray-600">
          This release focuses on enhancements to the CI/CD pipeline, adding Bun
          to the release workflow, and server updates.
        </p>

        <h2 className="mt-6 text-xl font-semibold">Features</h2>
        <ul className="mt-2 list-disc space-y-3 ps-6 text-lg">
          <li className="">
            <span className="font-semibold">Add Bun to Release Workflow</span>:
            Added Bun to the release workflow to improve deployment efficiency.
            <span className="ml-2 text-sm text-gray-500">Commit 4c498d5</span>
          </li>
          <li className="">
            <span className="font-semibold">
              Add Release and Env Configurations
            </span>
            : Added new configurations for release and environment management.
            <span className="ml-2 text-sm text-gray-500">
              Commit d64cffc, eb47a35
            </span>
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">Fixes</h2>
        <ul className="mt-2 list-disc space-y-3 ps-6 text-lg">
          <li className="">
            <span className="font-semibold">Fix CI Pipeline</span>: Resolved
            issues with the CI pipeline.
            <span className="ml-2 text-sm text-gray-500">
              Commit 70bcb87, 00d181e
            </span>
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-semibold">Improvements</h2>
        <ul className="mt-2 list-disc space-y-3 ps-6 text-lg">
          <li className="">
            <span className="font-semibold">
              Update CI/CD to Initiate Release
            </span>
            : Enhanced CI/CD pipeline to automatically initiate releases.
            <span className="ml-2 text-sm text-gray-500">Commit e46e7da</span>
          </li>
          <li className="">
            <span className="font-semibold">Update Server</span>: Applied
            updates to improve server performance.
            <span className="ml-2 text-sm text-gray-500">
              Commit 6b5b6cc, 00f677e
            </span>
          </li>
        </ul>
      </>
    ),
  },
  // =================================================================
  {
    date: "30 Septemeber 2024",
    title: "🎉 Batch Jobs, Financial Charts, and Platform Improvements",
    version: "🎉 v0.2.0",
    description: (
      <div className="space-y-6">
        <div>
          <p className="text-gray-600">
            This update includes new features for enhancing batch jobs,
            financial charts, and various platform improvements.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Features</h2>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <span className="font-semibold">Repo Guards</span>: Added repo
              guards for enhanced security and control over code changes.
              <span className="ml-2 text-sm text-gray-500">PR #1</span>
            </li>
            <li>
              <span className="font-semibold">Apps and Sync Services</span>:
              Introduced new applications and synchronization services to
              improve platform efficiency.
              <span className="ml-2 text-sm text-gray-500">PR #2</span>
            </li>
            <li>
              <span className="font-semibold">Financial Charts</span>: Added
              financial charting tools to provide insightful financial analysis.
              <span className="ml-2 text-sm text-gray-500">PR #3</span>
            </li>
            <li>
              <span className="font-semibold">Public Sites</span>: Expanded
              support to include other public sites for broader accessibility.
              <span className="ml-2 text-sm text-gray-500">PR #4</span>
            </li>
            <li>
              <span className="font-semibold">Placeholder Charts</span>: Added
              placeholder charts to improve visual feedback.
              <span className="ml-2 text-sm text-gray-500">PR #5</span>
            </li>
            <li>
              <span className="font-semibold">Empty States</span>: Introduced
              empty states in platform views for a better user experience.
              <span className="ml-2 text-sm text-gray-500">PR #7</span>
            </li>
            <li>
              <span className="font-semibold">Zoomable Charts</span>: Enhanced
              chart functionality with zoom capabilities.
              <span className="ml-2 text-sm text-gray-500">PR #21</span>
            </li>
            <li>
              <span className="font-semibold">Recurring Transactions Page</span>
              : Added a dedicated page for managing recurring transactions.
              <span className="ml-2 text-sm text-gray-500">PR #24</span>
            </li>
            <li>
              <span className="font-semibold">Free Tier Graphs</span>:
              Introduced graph support for free-tier users.
              <span className="ml-2 text-sm text-gray-500">PR #26</span>
            </li>
            <li>
              <span className="font-semibold">Recent Transactions View</span>:
              Implemented a new view for recent transactions.
              <span className="ml-2 text-sm text-gray-500">PR #25</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Bug Fixes</h2>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <span className="font-semibold">E2E Testing Bugs</span>: Addressed
              and resolved bugs identified during end-to-end testing.
              <span className="ml-2 text-sm text-gray-500">PR #18</span>
            </li>
            <li>
              <span className="font-semibold">Batch Sync Error</span>: Fixed a
              batch sync error that impacted data synchronization.
              <span className="ml-2 text-sm text-gray-500">PR #38</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">Improvements</h2>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <span className="font-semibold">Upstream Sync</span>: Regular
              synchronization with upstream codebase to ensure the latest
              updates.
              <span className="ml-2 text-sm text-gray-500">
                PR #8, PR #17, PR #19
              </span>
            </li>
            <li>
              <span className="font-semibold">TipTap Env Token</span>: Added
              environment token support to required actions.
              <span className="ml-2 text-sm text-gray-500">PR #13</span>
            </li>
            <li>
              <span className="font-semibold">Payment Support</span>: Added
              payment integration to the platform for seamless transactions.
              <span className="ml-2 text-sm text-gray-500">PR #36</span>
            </li>
            <li>
              <span className="font-semibold">Navigation Improvements</span>:
              Enhanced navigation features for easier user access.
              <span className="ml-2 text-sm text-gray-500">PR #33</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  // =================================================================
  // {
  //   date: "19 August 2024",
  //   title: "🚧 Model switch feature & Bug Fixes",
  //   version: "v0.0.3",
  //   description: (
  //     <ul className="space-y-3 text-lg list-disc ps-6">
  //       <li>
  //         <Link
  //           href="https://github.com/trypear/pearai-submodule/pull/137"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //           className="underline-offset-4 hover:underline"
  //         >
  //           Huge refactor
  //         </Link>{" "}
  //         & Performance improvements
  //       </li>
  //       <li>Added Mistral AI support</li>
  //       <li>Easy model switching</li>
  //       <li>Settings page revamp</li>
  //       <li>Added FAQ Page</li>
  //       <li>CMD+I context + options improved</li>
  //       <li>
  //         <span className="px-2 py-1 mr-1 text-black bg-green-200 rounded-lg">
  //           @codebase
  //         </span>{" "}
  //         searching enhanced
  //       </li>
  //       <li>PearAI token refresh bug fixed</li>
  //       <li>Onboarding flow revamp</li>
  //     </ul>
  //   ),
  // },
  // // =================================================================
  // {
  //   date: "2 August 2024",
  //   title: "🌟 Claude Sonnet Model, UI/UX improvements",
  //   version: "v0.0.2",
  //   description: (
  //     <div className="flex flex-col gap-y-4">
  //       <ul className="space-y-3 text-lg list-disc ps-6">
  //         <li>New AI Model - Claude 3.5 Sonnet</li>
  //         <li>Shortcuts Bar</li>
  //         <li>UI/UX improvements</li>
  //         <li>Bug fixes, including some extensions not working</li>
  //       </ul>
  //     </div>
  //   ),
  // },
  // =================================================================
  // {
  //   date: "15 July 2024",
  //   title: "🚀 Initial Launch",
  //   version: "v0.0.1",
  //   description: (
  //     <div className="flex flex-col gap-y-4">
  //       <ul className="space-y-3 text-lg list-disc ps-6">
  //         <li>VSCode Fork - Feel right at home</li>
  //         <li>Chat with AI models who have full code context</li>
  //         <li>
  //           Tag your files{" "}
  //           <span className="px-2 py-1 ml-1 text-black bg-green-200 rounded-lg">
  //             @filename
  //           </span>
  //         </li>
  //       </ul>
  //       <Image
  //         src="/images/changelogs/includeFile - v0.0.1.png"
  //         alt="PearAI v1.0.0 Dashboard"
  //         width={800}
  //         height={0}
  //         sizes="100vw"
  //         className="h-auto w-full max-w-[300px] rounded-2xl" // Added green hue border
  //         style={{
  //           width: "100%",
  //           height: "auto",
  //           maxWidth: "650px",
  //         }}
  //       />
  //     </div>
  //   ),
  // },
  // =================================================================
];

export default updates;

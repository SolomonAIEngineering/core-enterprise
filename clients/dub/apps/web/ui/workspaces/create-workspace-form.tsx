"use client";

import { Button, InfoTooltip, useMediaQuery } from "@dub/ui";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@dub/ui/ui";
import type { AdminRole, OrganizationSize } from "@prisma/client";

import { AlertCircleFill } from "@/ui/shared/icons";
import { BusinessConfig as platform } from "@dub/platform-config";
import { cn } from "@dub/utils";
import slugify from "@sindresorhus/slugify";
import { useSession } from "next-auth/react";
import { usePlausible } from "next-plausible";
import posthog from "posthog-js";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";

type FormData = {
  name: string;
  slug: string;
  adminRole?: AdminRole;
  organizationSize?: OrganizationSize;
  reason?: string;
};

export function CreateWorkspaceForm({
  onSuccess,
  className,
}: {
  onSuccess?: (data: FormData) => void;
  className?: string;
}) {
  const { update } = useSession();
  const plausible = usePlausible();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<FormData>();

  const slug = watch("slug");
  const adminRole = watch("adminRole");
  const organizationSize = watch("organizationSize");

  const { isMobile } = useMediaQuery();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          const res = await fetch("/api/workspaces", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (res.ok) {
            const { id: workspaceId } = await res.json();
            plausible("Created Workspace");
            // track workspace creation event
            posthog.capture("workspace_created", {
              workspace_id: workspaceId,
              workspace_name: data.name,
              workspace_slug: data.slug,
            });
            await Promise.all([mutate("/api/workspaces"), update()]);
            onSuccess?.(data);
          } else {
            const { error } = await res.json();
            const message = error.message;

            if (message.toLowerCase().includes("slug")) {
              return setError("slug", { message });
            }

            toast.error(error.message);
            setError("root.serverError", { message: error.message });
          }
        } catch (e) {
          toast.error("Failed to create workspace.");
          console.error("Failed to create workspace", e);
          setError("root.serverError", {
            message: "Failed to create workspace",
          });
        }
      })}
      className={cn("flex flex-col space-y-6 text-left", className)}
    >
      <div>
        <label htmlFor="name" className="flex items-center space-x-2">
          <p className="block text-sm font-medium text-gray-700">
            Workspace Name
          </p>
          <InfoTooltip
            content={`This is the name of your workspace on ${platform.company}.`}
          />
        </label>
        <div className="mt-2 flex rounded-md shadow-sm">
          <input
            id="name"
            type="text"
            autoFocus={!isMobile}
            autoComplete="off"
            className="block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
            placeholder="Acme, Inc."
            {...register("name", {
              required: true,
              onChange: (e) => setValue("slug", slugify(e.target.value)),
            })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="slug" className="flex items-center space-x-2">
          <p className="block text-sm font-medium text-gray-700">
            Workspace Slug
          </p>
          <InfoTooltip
            content={`This is your workspace's unique slug on ${platform.company}.`}
          />
        </label>
        <div className="relative mt-2 flex rounded-md shadow-sm">
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-5 text-gray-500 sm:text-sm">
            app.{platform.domain}
          </span>
          <input
            id="slug"
            type="text"
            required
            autoComplete="off"
            className={`${
              errors.slug
                ? "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
            } block w-full rounded-r-md focus:outline-none sm:text-sm`}
            placeholder="acme"
            {...register("slug", {
              required: true,
              minLength: 3,
              maxLength: 48,
              pattern: /^[a-zA-Z0-9\-]+$/,
            })}
            onBlur={() => {
              fetch(`/api/workspaces/${slug}/exists`).then(async (res) => {
                if (res.status === 200) {
                  const exists = await res.json();
                  if (exists === 1)
                    setError("slug", {
                      message: `The slug "${slug}" is already in use.`,
                    });
                  else clearErrors("slug");
                }
              });
            }}
            aria-invalid="true"
          />
          {errors.slug && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <AlertCircleFill
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {errors.slug && (
          <p className="mt-2 text-sm text-red-600" id="slug-error">
            {errors.slug.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="adminRole" className="flex items-center space-x-2">
          <p className="block text-sm font-medium text-gray-700">Your Role</p>
          <InfoTooltip content="What best describes your role in the organization?" />
        </label>
        <div className="mt-2">
          <Select
            value={adminRole}
            onValueChange={(value) => setValue("adminRole", value as AdminRole)}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select your title" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectItem value="SoftwareEngineer">
                  Software Engineer
                </SelectItem>
                <SelectItem value="ProductManager">Product Manager</SelectItem>
                <SelectItem value="CustomerSuccess">
                  Customer Success
                </SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Support">Support</SelectItem>
                <SelectItem value="Founder">Founder</SelectItem>
                <SelectItem value="CTO">CTO</SelectItem>
                <SelectItem value="CEO">CEO</SelectItem>
                <SelectItem value="CFO">CFO</SelectItem>
                <SelectItem value="COO">COO</SelectItem>
                <SelectItem value="CMO">CMO</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label
          htmlFor="organizationSize"
          className="flex items-center space-x-2"
        >
          <p className="block text-sm font-medium text-gray-700">
            Organization Size
          </p>
          <InfoTooltip content="How many people work in your organization?" />
        </label>
        <div className="mt-2">
          <Select
            value={organizationSize}
            onValueChange={(value) =>
              setValue("organizationSize", value as OrganizationSize)
            }
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select organization size" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                <SelectItem value="OneToFive">1-5 employees</SelectItem>
                <SelectItem value="SixToTwentyFive">6-25 employees</SelectItem>
                <SelectItem value="TwentySixToOneHundred">
                  26-100 employees
                </SelectItem>
                <SelectItem value="OneHundredOneToFiveHundred">
                  101-500 employees
                </SelectItem>
                <SelectItem value="FiveHundredToOneThousand">
                  501-1000 employees
                </SelectItem>
                <SelectItem value="OneThousandToFiveThousand">
                  1001-5000 employees
                </SelectItem>
                <SelectItem value="FiveThousandPlus">
                  5000+ employees
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label htmlFor="reason" className="flex items-center space-x-2">
          <p className="block text-sm font-medium text-gray-700">
            Why are you creating this workspace?
          </p>
          <InfoTooltip content="Help us understand how we can better serve your needs" />
        </label>
        <div className="mt-2">
          <textarea
            id="reason"
            rows={3}
            className="block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
            placeholder="Tell us about your use case..."
            {...register("reason")}
          />
        </div>
      </div>

      <Button
        loading={isSubmitting || isSubmitSuccessful}
        text="Create workspace"
      />
    </form>
  );
}

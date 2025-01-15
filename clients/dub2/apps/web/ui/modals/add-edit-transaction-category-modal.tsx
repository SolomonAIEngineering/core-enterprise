import {
  CATEGORY_COLORS_LIST,
  type TransactionCategoryColorProps,
} from "@/ui/transactions/transaction-category-badge";
import {
  Button,
  InfoTooltip,
  Label,
  Logo,
  Modal,
  RadioGroup,
  RadioGroupItem,
  Switch,
  TooltipContent,
  useMediaQuery,
} from "@dub/ui";
import { capitalize, pluralize } from "@dub/utils";
import { ChartBar, Receipt, Settings, Tag } from "lucide-react";
import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

import { mutatePrefix } from "@/lib/swr/mutate";
import useTransactionCategories, {
  type TransactionCategoryProps,
} from "@/lib/swr/use-transaction-categories";
import useWorkspace from "@/lib/swr/use-workspace";
import posthog from "posthog-js";
import { toast } from "sonner";

function AddEditTransactionCategoryModal({
  showAddEditCategoryModal,
  setShowAddEditCategoryModal,
  props,
}: {
  showAddEditCategoryModal: boolean;
  setShowAddEditCategoryModal: Dispatch<SetStateAction<boolean>>;
  props?: TransactionCategoryProps;
}) {
  const { id: workspaceId } = useWorkspace();
  const { isMobile } = useMediaQuery();
  const { categories } = useTransactionCategories(); // For parent category selection

  const [saving, setSaving] = useState(false);

  const [data, setData] = useState<Partial<TransactionCategoryProps>>(
    props || {
      id: "",
      name: "",
      description: "",
      color: "other",
      icon: null,
      parentId: null,
      isSystem: false,
      isActive: true,
      budgetLimit: null,
      warningThreshold: null,
      trackingEnabled: true,
      vatRate: null,
      taxCode: null,
      taxDeductible: false,
      metadata: null,
    },
  );

  const saveDisabled = useMemo(
    () =>
      saving ||
      !data.name ||
      (props &&
        Object.entries(props).every(([key, value]) => data[key] === value)),
    [props, data, saving],
  );

  const endpoint = useMemo(
    () =>
      data.id
        ? {
            method: "PUT",
            url: `/api/categories/${data.id}?workspaceId=${workspaceId}`,
            successMessage: "Successfully updated category!",
          }
        : {
            method: "POST",
            url: `/api/categories?workspaceId=${workspaceId}`,
            successMessage: "Successfully added category!",
          },
    [data.id, workspaceId],
  );

  return (
    <Modal
      showModal={showAddEditCategoryModal}
      setShowModal={setShowAddEditCategoryModal}
      className="max-h-[90vh] max-w-2xl"
    >
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-4 py-6 sm:px-16">
        <Logo className="h-10 w-10" />
        <div className="flex flex-col space-y-1 text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            {props ? "Edit" : "Create"} Transaction Category
          </h3>
          <p className="text-sm text-gray-500">
            Use transaction categories to organize and track your transactions.
          </p>
        </div>
      </div>

      <form
        onSubmit={async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setSaving(true);
          fetch(endpoint.url, {
            method: endpoint.method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then(async (res) => {
            if (res.status === 200 || res.status === 201) {
              posthog.capture(
                props
                  ? "transaction_category_edited"
                  : "transaction_category_created",
                {
                  transaction_category_id: data.id,
                  transaction_category_name: data.name,
                },
              );
              await mutatePrefix(["/api/categories"]);
              toast.success(endpoint.successMessage);
              setShowAddEditCategoryModal(false);
            } else {
              const { error } = await res.json();
              toast.error(error.message);
            }
            setSaving(false);
          });
        }}
        className="flex flex-col space-y-8 bg-white px-4 py-8 text-left sm:px-16"
      >
        {/* Basic Information */}
        <div className="grid gap-6">
          <div className="col-span-full">
            <h4 className="mb-4 flex items-center text-sm font-medium text-gray-900">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <Tag className="h-4 w-4 text-gray-600" />
              </div>
              Basic Information
            </h4>
            <div className="grid gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 flex items-center space-x-2"
                >
                  <p className="block text-sm font-medium text-gray-700">
                    Category Name
                  </p>
                  <InfoTooltip content="Name of the transaction category for easy identification" />
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  required
                  autoFocus={!isMobile}
                  autoComplete="off"
                  className="block w-full rounded-lg border-gray-300 text-gray-900 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  placeholder="New Category"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 flex items-center space-x-2"
                >
                  <p className="block text-sm font-medium text-gray-700">
                    Description
                  </p>
                  <InfoTooltip content="A brief description of what this transaction category represents" />
                </label>
                <textarea
                  name="description"
                  id="description"
                  className="block w-full rounded-lg border-gray-300 text-gray-900 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  placeholder="Category description"
                  value={data.description || ""}
                  rows={3}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                />
              </div>

              <div>
                {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                <label className="mb-3 flex items-center space-x-2">
                  <p className="block text-sm font-medium text-gray-700">
                    Category Color
                  </p>
                  <InfoTooltip content="Choose a color to visually identify this category" />
                </label>
                <RadioGroup
                  value={data.color as string}
                  onValueChange={(value: TransactionCategoryColorProps) => {
                    setData({ ...data, color: value });
                  }}
                  className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6"
                >
                  {CATEGORY_COLORS_LIST.map(({ color, css }) => (
                    <div key={color} className="flex items-center">
                      <RadioGroupItem
                        value={color}
                        id={color}
                        className="peer pointer-events-none absolute opacity-0"
                      />
                      <Label
                        htmlFor={color}
                        className={`w-full cursor-pointer whitespace-nowrap rounded-md px-2.5 py-1.5 text-center text-sm capitalize transition-all duration-150 hover:opacity-90 ${css} ${
                          data.color === color ? "ring-2 ring-offset-2" : ""
                        }`}
                      >
                        {color}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <label
                  htmlFor="parentId"
                  className="mb-2 flex items-center space-x-2"
                >
                  <p className="block text-sm font-medium text-gray-700">
                    Parent Category
                  </p>
                  <InfoTooltip content="Optional parent category for hierarchical organization" />
                </label>
                <select
                  id="parentId"
                  name="parentId"
                  className="block w-full rounded-lg border-gray-300 text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                  value={data.parentId || ""}
                  onChange={(e) =>
                    setData({ ...data, parentId: e.target.value || null })
                  }
                >
                  <option value="">No parent category</option>
                  {categories
                    ?.filter((c) => c.id !== data.id)
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          {/* Budget Settings */}
          <div className="col-span-full">
            <h4 className="mb-4 flex items-center text-sm font-medium text-gray-900">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <ChartBar className="h-4 w-4 text-gray-600" />
              </div>
              Budget Settings
            </h4>
            <div className="space-y-4 rounded-lg bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-700">
                    Enable Budget Tracking
                  </p>
                  <InfoTooltip content="Track spending against budget for this category" />
                </div>
                <Switch
                  checked={data.trackingEnabled}
                  fn={(checked) =>
                    setData({ ...data, trackingEnabled: checked })
                  }
                />
              </div>

              {data.trackingEnabled && (
                <div className="grid gap-4 pt-4">
                  <div>
                    <label
                      htmlFor="budgetLimit"
                      className="mb-2 flex items-center space-x-2"
                    >
                      <p className="block text-sm font-medium text-gray-700">
                        Monthly Budget Limit
                      </p>
                      <InfoTooltip content="Maximum monthly spending limit for this category" />
                    </label>
                    <div className="relative rounded-lg">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="budgetLimit"
                        id="budgetLimit"
                        min="0"
                        step="0.01"
                        className="block w-full rounded-lg border-gray-300 pl-7 text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                        value={data.budgetLimit || ""}
                        onChange={(e) =>
                          setData({
                            ...data,
                            budgetLimit: parseFloat(e.target.value) || null,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="warningThreshold"
                      className="mb-2 flex items-center space-x-2"
                    >
                      <p className="block text-sm font-medium text-gray-700">
                        Warning Threshold
                      </p>
                      <InfoTooltip content="Percentage of budget at which to show warnings" />
                    </label>
                    <div className="relative rounded-lg">
                      <input
                        type="number"
                        name="warningThreshold"
                        id="warningThreshold"
                        min="0"
                        max="100"
                        className="block w-full rounded-lg border-gray-300 pr-12 text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                        value={data.warningThreshold || ""}
                        onChange={(e) =>
                          setData({
                            ...data,
                            warningThreshold:
                              parseFloat(e.target.value) || null,
                          })
                        }
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 sm:text-sm">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tax Information */}
          <div className="col-span-full">
            <h4 className="mb-4 flex items-center text-sm font-medium text-gray-900">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <Receipt className="h-4 w-4 text-gray-600" />
              </div>
              Tax Information
            </h4>
            <div className="space-y-4 rounded-lg bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-700">
                    Tax Deductible
                  </p>
                  <InfoTooltip content="Mark if expenses in this category are tax deductible" />
                </div>
                <Switch
                  checked={data.taxDeductible}
                  fn={(checked) => setData({ ...data, taxDeductible: checked })}
                />
              </div>

              <div className="grid gap-4 pt-4">
                <div>
                  <label
                    htmlFor="vatRate"
                    className="mb-2 flex items-center space-x-2"
                  >
                    <p className="block text-sm font-medium text-gray-700">
                      VAT Rate
                    </p>
                    <InfoTooltip content="VAT/Tax rate for this category" />
                  </label>
                  <div className="relative rounded-lg">
                    <input
                      type="number"
                      name="vatRate"
                      id="vatRate"
                      min="0"
                      max="100"
                      step="0.01"
                      className="block w-full rounded-lg border-gray-300 pr-12 text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                      value={data.vatRate || ""}
                      onChange={(e) =>
                        setData({
                          ...data,
                          vatRate: parseFloat(e.target.value) || null,
                        })
                      }
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 sm:text-sm">%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="taxCode"
                    className="mb-2 flex items-center space-x-2"
                  >
                    <p className="block text-sm font-medium text-gray-700">
                      Tax Code
                    </p>
                    <InfoTooltip content="Tax code for reporting purposes" />
                  </label>
                  <input
                    type="text"
                    name="taxCode"
                    id="taxCode"
                    className="block w-full rounded-lg border-gray-300 text-gray-900 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                    value={data.taxCode || ""}
                    onChange={(e) =>
                      setData({ ...data, taxCode: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* System Settings */}
          <div className="col-span-full">
            <h4 className="mb-4 flex items-center text-sm font-medium text-gray-900">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                <Settings className="h-4 w-4 text-gray-600" />
              </div>
              System Settings
            </h4>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-700">Active</p>
                  <InfoTooltip content="Inactive categories won't appear in selection menus" />
                </div>
                <Switch
                  checked={data.isActive}
                  fn={(checked) => setData({ ...data, isActive: checked })}
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          disabled={saveDisabled}
          loading={saving}
          text={props ? "Save changes" : "Create transaction category"}
          className="w-full"
        />
      </form>
    </Modal>
  );
}

function AddTransactionCategoryButton({
  setShowAddEditCategoryModal,
}: {
  setShowAddEditCategoryModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { slug, plan, tagsLimit } = useWorkspace();
  const { categories } = useTransactionCategories();
  const exceededCategories =
    categories && tagsLimit && categories.length >= tagsLimit;

  return (
    <div>
      <Button
        variant="primary"
        text="Create category"
        className="h-9 rounded-lg"
        disabledTooltip={
          exceededCategories ? (
            <TooltipContent
              title={`You can only add up to ${tagsLimit} ${pluralize("category", tagsLimit || 0)} on the ${capitalize(plan)} plan. Upgrade to add more categories`}
              cta="Upgrade"
              href={`/${slug}/upgrade`}
            />
          ) : undefined
        }
        onClick={() => setShowAddEditCategoryModal(true)}
      />
    </div>
  );
}

export function useAddEditTransactionCategoryModal({
  props,
}: { props?: TransactionCategoryProps } = {}) {
  const [showAddEditCategoryModal, setShowAddEditCategoryModal] =
    useState(false);

  const AddEditTransactionCategoryModalCallback = useCallback(() => {
    return (
      <AddEditTransactionCategoryModal
        showAddEditCategoryModal={showAddEditCategoryModal}
        setShowAddEditCategoryModal={setShowAddEditCategoryModal}
        props={props}
      />
    );
  }, [showAddEditCategoryModal, setShowAddEditCategoryModal, props]);

  const AddTransactionCategoryButtonCallback = useCallback(() => {
    return (
      <AddTransactionCategoryButton
        setShowAddEditCategoryModal={setShowAddEditCategoryModal}
      />
    );
  }, [setShowAddEditCategoryModal]);

  return useMemo(
    () => ({
      setShowAddEditCategoryModal,
      AddEditTransactionCategoryModal: AddEditTransactionCategoryModalCallback,
      AddTransactionCategoryButton: AddTransactionCategoryButtonCallback,
    }),
    [
      setShowAddEditCategoryModal,
      AddEditTransactionCategoryModalCallback,
      AddTransactionCategoryButtonCallback,
    ],
  );
}

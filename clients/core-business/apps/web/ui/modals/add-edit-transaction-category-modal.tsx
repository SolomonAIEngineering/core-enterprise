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
import { CATEGORY_COLORS_LIST, TransactionCategoryColorProps } from "@/ui/transactions/transaction-category-badge";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { capitalize, pluralize } from "@dub/utils";

import { TransactionCategoryProps } from "@/lib/swr/use-transaction-categories";
import { mutatePrefix } from "@/lib/swr/mutate";
import posthog from "posthog-js";
import { toast } from "sonner";
import useTransactionCategories from "@/lib/swr/use-transaction-categories";
import useWorkspace from "@/lib/swr/use-workspace";

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
      className="max-w-2xl max-h-[90vh]"
    >
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-4 py-4 pt-8 sm:px-16">
        <Logo />
        <div className="flex flex-col space-y-1 text-center">
          <h3 className="text-lg font-medium">
            {props ? "Edit" : "Create"} category
          </h3>
          <p className="text-sm text-gray-500">
            Use categories to organize and track your transactions.
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
              posthog.capture(props ? "category_edited" : "category_created", {
                category_id: data.id,
                category_name: data.name,
              });
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
        className="flex flex-col space-y-6 bg-gray-50 px-4 py-8 text-left sm:rounded-b-2xl sm:px-16"
      >
        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Basic Information</h4>

          <div>
            <label htmlFor="name" className="flex items-center space-x-2">
              <p className="block text-sm font-medium text-gray-700">Category Name</p>
              <InfoTooltip content="Name of the category for easy identification" />
            </label>
            <div className="mt-2">
              <input
                name="name"
                id="name"
                type="text"
                required
                autoFocus={!isMobile}
                autoComplete="off"
                className="block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder="New Category"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="flex items-center space-x-2">
              <p className="block text-sm font-medium text-gray-700">Description</p>
              <InfoTooltip content="A brief description of what this category represents" />
            </label>
            <div className="mt-2">
              <textarea
                name="description"
                id="description"
                className="block w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder="Category description"
                value={data.description || ""}
                rows={3}
                onChange={(e) => setData({ ...data, description: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <p className="block text-sm font-medium text-gray-700">Category Color</p>
              <InfoTooltip content="Choose a color to visually identify this category" />
            </label>
            <RadioGroup
              value={data.color as string}
              onValueChange={(value: TransactionCategoryColorProps) => {
                setData({ ...data, color: value });
              }}
              className="mt-2 flex flex-wrap gap-3"
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
                    className={`cursor-pointer whitespace-nowrap rounded-md px-2 py-0.5 text-sm capitalize ring-current peer-focus-visible:ring-offset-2 ${css} ${data.color === color ? "ring-2" : ""
                      }`}
                  >
                    {color}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <label htmlFor="parentId" className="flex items-center space-x-2">
              <p className="block text-sm font-medium text-gray-700">Parent Category</p>
              <InfoTooltip content="Optional parent category for hierarchical organization" />
            </label>
            <div className="mt-2">
              <select
                id="parentId"
                name="parentId"
                className="block w-full rounded-md border-gray-300 text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                value={data.parentId || ""}
                onChange={(e) => setData({ ...data, parentId: e.target.value || null })}
              >
                <option value="">No parent category</option>
                {categories?.filter(c => c.id !== data.id).map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Budget Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Budget Settings</h4>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-gray-700">Enable Budget Tracking</p>
              <InfoTooltip content="Track spending against budget for this category" />
            </div>
            <Switch
              checked={data.trackingEnabled}
              fn={(checked) => setData({ ...data, trackingEnabled: checked })}
            />
          </div>

          {data.trackingEnabled && (
            <>
              <div>
                <label htmlFor="budgetLimit" className="flex items-center space-x-2">
                  <p className="block text-sm font-medium text-gray-700">Monthly Budget Limit</p>
                  <InfoTooltip content="Maximum monthly spending limit for this category" />
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="budgetLimit"
                    id="budgetLimit"
                    min="0"
                    step="0.01"
                    className="block w-full rounded-md border-gray-300 text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                    value={data.budgetLimit || ""}
                    onChange={(e) => setData({ ...data, budgetLimit: parseFloat(e.target.value) || null })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="warningThreshold" className="flex items-center space-x-2">
                  <p className="block text-sm font-medium text-gray-700">Warning Threshold (%)</p>
                  <InfoTooltip content="Percentage of budget at which to show warnings" />
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="warningThreshold"
                    id="warningThreshold"
                    min="0"
                    max="100"
                    className="block w-full rounded-md border-gray-300 text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                    value={data.warningThreshold || ""}
                    onChange={(e) => setData({ ...data, warningThreshold: parseFloat(e.target.value) || null })}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Tax Information */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Tax Information</h4>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-gray-700">Tax Deductible</p>
              <InfoTooltip content="Mark if expenses in this category are tax deductible" />
            </div>
            <Switch
              checked={data.taxDeductible}
              fn={(checked) => setData({ ...data, taxDeductible: checked })}
            />
          </div>

          <div>
            <label htmlFor="vatRate" className="flex items-center space-x-2">
              <p className="block text-sm font-medium text-gray-700">VAT Rate (%)</p>
              <InfoTooltip content="VAT/Tax rate for this category" />
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="vatRate"
                id="vatRate"
                min="0"
                max="100"
                step="0.01"
                className="block w-full rounded-md border-gray-300 text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                value={data.vatRate || ""}
                onChange={(e) => setData({ ...data, vatRate: parseFloat(e.target.value) || null })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="taxCode" className="flex items-center space-x-2">
              <p className="block text-sm font-medium text-gray-700">Tax Code</p>
              <InfoTooltip content="Tax code for reporting purposes" />
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="taxCode"
                id="taxCode"
                className="block w-full rounded-md border-gray-300 text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                value={data.taxCode || ""}
                onChange={(e) => setData({ ...data, taxCode: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">System Settings</h4>

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

        <Button
          disabled={saveDisabled}
          loading={saving}
          text={props ? "Save changes" : "Create transaction category"}
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
  const exceededCategories = categories && tagsLimit && categories.length >= tagsLimit;

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

export function useAddEditTransactionCategoryModal({ props }: { props?: TransactionCategoryProps } = {}) {
  const [showAddEditCategoryModal, setShowAddEditCategoryModal] = useState(false);

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
    return <AddTransactionCategoryButton setShowAddEditCategoryModal={setShowAddEditCategoryModal} />;
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

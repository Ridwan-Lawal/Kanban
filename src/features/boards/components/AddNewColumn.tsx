"use client";

import { addNewColumnsAction } from "@/features/boards/actions/board-actions";
import { handleNewColumnsModalToggle, selectDashboard } from "@/lib/redux/dashboard-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { ColumnSchema, ColumnSchemaType } from "@/lib/schema/dashboard-zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

export default function AddNewColumn() {
  // use React hook form
  const { register, handleSubmit, formState, reset, control } = useForm<ColumnSchemaType>({
    resolver: zodResolver(ColumnSchema),
    defaultValues: { columns: [{ name: "" }] },
  });
  const [isAddingNewColumns, startAddColumnTransition] = useTransition();
  const { boardId } = useParams<{ boardId: string }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const { columns } = useWatch({
    control,
  });

  const { isNewColumnsModalOpen } = useAppSelector(selectDashboard);
  const dispatch = useAppDispatch();

  const allColumnsInputAreFilled = columns?.every((field) => field.name);

  console.log(allColumnsInputAreFilled, "Filled");

  const { errors } = formState;

  function addColumnsToDb(formData: ColumnSchemaType) {
    startAddColumnTransition(async () => {
      const res = await addNewColumnsAction(formData, boardId);

      if (res.status === "error") {
        toast.error("Operation failed", { description: res.message });
      } else {
        toast.success(res.message);
        reset();
        dispatch(handleNewColumnsModalToggle(false));
      }
    });
  }

  return (
    <AnimatePresence>
      {isNewColumnsModalOpen && (
        <motion.aside
          initial={{ visibility: "hidden", opacity: 0 }}
          animate={{ visibility: "visible", opacity: 1 }}
          exit={{ visibility: "hidden", opacity: 0 }}
          className="overlay fixed top-0 left-0 z-30 flex h-screen w-screen items-center justify-center bg-black/20 backdrop-blur-[1px]"
        >
          <motion.form
            initial={{ scale: "80%" }}
            animate={{ scale: "100%" }}
            exit={{ scale: "80%" }}
            autoComplete="on"
            className="form z-50 w-full max-w-100 space-y-6 rounded-[6px] bg-white px-5 py-5"
            onSubmit={handleSubmit(addColumnsToDb)}
          >
            <h2 className="heading-l text-black capitalize">Add new columns</h2>

            {/* columns fields */}
            <div className="flex flex-col gap-2">
              <label htmlFor="columns" className="body-m text-medium-grey dark:text-white">
                Board Columns
              </label>

              <div className="no-scrollbar max-h-54 space-y-2 overflow-auto">
                {/*  */}
                {fields.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        id="columns"
                        className="input__field border-medium-grey/25 w-full rounded-[6px] border px-4 py-1.5 text-[13px] leading-5.75 font-medium"
                        disabled={isAddingNewColumns}
                        {...register(`columns.${idx}.name` as const)}
                      />

                      {/* The X button */}

                      {idx > 0 && (
                        <X
                          className="text-medium-grey size-5 cursor-pointer"
                          onClick={() => remove(idx)}
                          aria-disabled={isAddingNewColumns}
                          aria-label="Delete column field"
                        />
                      )}
                    </div>
                    {errors?.columns?.[idx]?.message && (
                      <p className="body-l text-red">{errors?.columns[idx]?.message}</p>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="btn btn-secondary mt-2 w-full py-2.5"
                onClick={() => append({ name: "" })}
                disabled={isAddingNewColumns}
              >
                + Add an extra Column
              </button>
            </div>

            <button
              className="btn btn-primary-s w-full py-2.5 capitalize disabled:cursor-not-allowed disabled:opacity-70"
              disabled={!allColumnsInputAreFilled || isAddingNewColumns}
            >
              {isAddingNewColumns ? "Creating columns..." : " Create columns"}
            </button>
          </motion.form>

          <div
            className="fixed top-0 h-screen w-full"
            onClick={() => dispatch(handleNewColumnsModalToggle(false))}
          />
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

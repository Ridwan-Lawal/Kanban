"use client";

import InputField from "@/components/ui/InputField";
import { addNewBoardAction, editBoardAction } from "@/features/boards/actions/board-actions";
import {
  handleAddBoardFormToggle,
  handleAddBoardToEdit,
  selectDashboard,
} from "@/lib/redux/dashboard-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { BoardSchema, BoardSchemaType } from "@/lib/schema/dashboard-zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

export default function AddNewBoardForm() {
  const { isAddBoardFormOpen, boardToEdit } = useAppSelector(selectDashboard);
  const dispatch = useAppDispatch();
  const [isCreatingNewBoard, startTransition] = useTransition();
  const [isEditingBoard, startEditBoardTransition] = useTransition();
  const router = useRouter();

  const { register, handleSubmit, control, formState, reset } = useForm<BoardSchemaType>({
    resolver: zodResolver(BoardSchema),
  });

  useEffect(() => {
    if (boardToEdit) {
      reset({
        name: boardToEdit.name,
        columns: boardToEdit.columns.map((col) => ({ id: col.id, name: col.name })),
      });
    } else {
      reset({
        name: "",
        columns: [{ name: "" }],
      });
    }
  }, [boardToEdit, reset]);

  const { name, columns } = useWatch({ control });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const { errors } = formState;
  const isNameFilled = name?.trim();
  const isAllColumnsFilled = columns?.every((column) => column.name?.trim());

  const areAllFormFieldsFilled = !!isNameFilled && !!isAllColumnsFilled;

  const isButtonDisabled = !areAllFormFieldsFilled || isCreatingNewBoard;

  function handleNewBoardFormSubmit(data: BoardSchemaType) {
    startTransition(async () => {
      const res = await addNewBoardAction(data);
      if (res.error) {
        toast.error("Board creation failed", { description: res.error });
      } else if (res.success) {
        toast.success("Board created successfully");
        reset();
        dispatch(handleAddBoardFormToggle());
        router.push(`/dashboard/boards/${res.newBoardId}`);
      }
    });
  }

  function handleBoardUpdateChanges(formData: BoardSchemaType) {
    startEditBoardTransition(async () => {
      const res = await editBoardAction(boardToEdit?.id, formData);

      if (res.status === "error") {
        toast.error("Board creation failed", { description: res.message });
      } else {
        toast.success(res.message);
        dispatch(handleAddBoardFormToggle());
        dispatch(handleAddBoardToEdit(null));
        reset({
          name: "",
          columns: [{ name: "" }],
        });
      }
    });
  }

  return (
    <AnimatePresence>
      {isAddBoardFormOpen && (
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
            onSubmit={handleSubmit(
              boardToEdit ? handleBoardUpdateChanges : handleNewBoardFormSubmit,
            )}
          >
            <h2 className="heading-l text-black capitalize">
              {boardToEdit ? "edit board" : "add new board"}
            </h2>

            <div className="space-y-6">
              <InputField label="Board Name" htmlFor="name" error={errors?.name?.message}>
                <input
                  type="text"
                  id="name"
                  defaultValue={boardToEdit?.name}
                  autoComplete="board name"
                  placeholder="e.g Web Design"
                  className="input__field text-[13px] leading-5.75 font-medium"
                  disabled={isCreatingNewBoard || isEditingBoard}
                  aria-invalid={!!errors?.name?.message}
                  {...register("name")}
                />
              </InputField>

              <div className="flex flex-col gap-2">
                <label htmlFor="columns" className="body-m text-medium-grey dark:text-white">
                  Board Columns
                </label>

                <div className="no-scrollbar max-h-54 space-y-2 overflow-auto">
                  {fields.map((item, index) => (
                    <div key={item.id} className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          {...register(`columns.${index}.name` as const)}
                          className="input__field border-medium-grey/25 rounded-[6px] border px-4 py-1.5 text-[13px] leading-5.75 font-medium"
                          disabled={isCreatingNewBoard || isEditingBoard}
                        />

                        {index > 0 && (
                          <X
                            className="text-medium-grey size-5 cursor-pointer"
                            onClick={() => remove(index)}
                          />
                        )}
                      </div>

                      {errors?.columns?.[index]?.message && (
                        <p className="body-l text-red">{errors?.columns[index]?.message}</p>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn btn-secondary mt-2 w-full py-2.5"
                  onClick={() => append({ name: "" })}
                  disabled={isCreatingNewBoard || isEditingBoard}
                >
                  + Add New Column
                </button>
              </div>
            </div>

            <button
              className="btn btn-primary-s w-full py-2.5 capitalize disabled:cursor-pointer disabled:opacity-70"
              style={{ cursor: isButtonDisabled ? "not-allowed" : "pointer" }}
              disabled={isButtonDisabled || isEditingBoard || isCreatingNewBoard}
              aria-disabled={isButtonDisabled}
            >
              {boardToEdit
                ? isEditingBoard
                  ? "Making changes..."
                  : "Update board"
                : isCreatingNewBoard
                  ? "Creating board..."
                  : "Create New Board"}
            </button>
          </motion.form>
          <div
            className="fixed h-screen w-full"
            onClick={() => {
              dispatch(handleAddBoardFormToggle());
              dispatch(handleAddBoardToEdit(null));
            }}
          />
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

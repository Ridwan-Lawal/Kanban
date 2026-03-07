"use client";

import InputField from "@/components/ui/InputField";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addNewTaskAction, editTaskAction } from "@/features/tasks/action/tasks-action";
import { useGetCurrentBoardColumns } from "@/features/tasks/hooks/useTask";
import {
  addTaskToEdit,
  handleAddNewTaskModalToggle,
  selectDashboard,
} from "@/lib/redux/dashboard-slice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { TaskSchema, TaskSchemaType } from "@/lib/schema/dashboard-zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

export default function AddNewTask() {
  const dispatch = useAppDispatch();
  const { isAddNewTaskModalOpen, taskToEdit } = useAppSelector(selectDashboard);
  const { boardId } = useParams<{ boardId: string | undefined }>();
  const { boardColumns } = useGetCurrentBoardColumns(boardId);
  const [isAddingNewTask, startAddTaskTransition] = useTransition();
  const [isEditingTask, startEditTaskTransition] = useTransition();

  const { register, handleSubmit, reset, control, formState } = useForm<TaskSchemaType>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: boardColumns?.at(0)?.name ?? "",
      subtasks: [{ title: "" }],
    },
  });
  const { subtasks, ...restOfFields } = useWatch({ control });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  useEffect(() => {
    reset({
      title: taskToEdit?.title ?? "",
      description: taskToEdit?.description ?? "",
      status: taskToEdit?.status ?? "",
      subtasks: taskToEdit?.subtasks.map((subtask) => ({
        title: subtask.title,
        id: subtask.id,
      })) ?? [{ title: "" }],
    });
  }, [taskToEdit, reset]);

  const statusColumnChosen = boardColumns?.find(
    (column) => column.name.toLowerCase() === restOfFields.status?.toLowerCase(),
  );
  const { errors } = formState;

  const isSubtasksFieldFilled = subtasks?.every((task) => task?.title);
  const areTheRestOfTheFieldsField = Object.values(restOfFields)?.every((field) => field);

  function handleAddingNewTask(formData: TaskSchemaType) {
    startAddTaskTransition(async () => {
      if (!statusColumnChosen?.id || !boardId) return;
      const res = await addNewTaskAction(formData, statusColumnChosen.id, boardId);
      if (res?.error) {
        toast.error("Failed to add new task", { description: res?.error });
      }
      if (res?.success) {
        toast.success(res.success);
        reset();
        dispatch(handleAddNewTaskModalToggle(false));
      }
    });
  }

  function handleEditTask(formData: TaskSchemaType) {
    startEditTaskTransition(async () => {
      if (!taskToEdit?.id) return;
      const res = await editTaskAction(formData, taskToEdit?.id);

      if (res?.error) {
        toast.error(res.error);
      }
      if (res?.success) {
        toast.success(res.success);
        dispatch(handleAddNewTaskModalToggle(false));
        dispatch(addTaskToEdit(null));
        reset({
          title: "",
          description: "",
          status: boardColumns?.at(0)?.name,
          subtasks: [{ title: "" }],
        });
      }
    });
  }

  return (
    <AnimatePresence>
      {isAddNewTaskModalOpen && (
        <motion.aside
          initial={{ visibility: "hidden", opacity: 0 }}
          animate={{ visibility: "visible", opacity: 1 }}
          exit={{ visibility: "hidden", opacity: 0 }}
          className="overlay fixed top-0 left-0 z-40 flex h-screen w-screen items-center justify-center bg-black/20 backdrop-blur-[1px]"
        >
          <motion.form
            initial={{ scale: "80%" }}
            animate={{ scale: "100%" }}
            exit={{ scale: "80%" }}
            autoComplete="on"
            className="form no-scrollbar dark:bg-dark-grey z-50 h-120 w-full max-w-100 space-y-6 overflow-auto rounded-[6px] bg-white px-5 py-5"
            onSubmit={handleSubmit(taskToEdit ? handleEditTask : handleAddingNewTask)}
          >
            <h2 className="heading-l text-black capitalize dark:text-white">
              {taskToEdit ? "Edit task" : "add new task"}
            </h2>
            <div className="space-y-6">
              <InputField label="Title" htmlFor="name" error={errors?.title?.message}>
                <input
                  type="text"
                  id="title"
                  autoComplete="task title"
                  className="input__field text-[13px] leading-5.75 font-medium"
                  disabled={isAddingNewTask || isEditingTask}
                  {...register("title")}
                />
              </InputField>

              <InputField
                label="Description"
                htmlFor="description"
                error={errors.description?.message}
              >
                <textarea
                  id="description"
                  autoComplete="description"
                  className="input__field w-full text-[13px] leading-5.75 font-medium"
                  rows={3}
                  disabled={isAddingNewTask || isEditingTask}
                  {...register("description")}
                />
              </InputField>

              {/* subtasks */}
              <div className="flex flex-col gap-2">
                <label htmlFor="columns" className="body-m text-medium-grey dark:text-white">
                  Subtasks
                </label>

                <div className="space-y-2 overflow-auto">
                  {fields.map((item, idx) => (
                    <div key={item.id} className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          {...register(`subtasks.${idx}.title` as const)}
                          className="input__field border-medium-grey/25 rounded-[6px] border px-4 py-1.5 text-[13px] leading-5.75 font-medium"
                          disabled={isAddingNewTask || isEditingTask}
                        />

                        <X
                          className="text-medium-grey hover:text-red size-5 cursor-pointer"
                          onClick={() => remove(idx)}
                        />
                      </div>

                      {errors?.subtasks?.[idx]?.message && (
                        <p className="body-l text-red">{errors?.subtasks[idx]?.message}</p>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn btn-secondary dark:text-main-purple mt-2 w-full py-2.5 dark:bg-white"
                  onClick={() => append({ title: "" })}
                  disabled={isAddingNewTask || isEditingTask}
                >
                  + Add New Subtask
                </button>
              </div>

              <div className="flex w-full flex-col gap-2">
                <label htmlFor="status" className="body-m text-medium-grey dark:text-white">
                  Status
                </label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isAddingNewTask || isEditingTask}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="status" className="input__field w-full" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          {boardColumns?.map((column) => (
                            <SelectItem
                              key={column.id}
                              value={column.name}
                              className="input__field capitalize"
                            >
                              {column.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <button
              className="btn btn-primary-s w-full py-2.5 capitalize disabled:cursor-not-allowed disabled:opacity-70"
              disabled={
                !isSubtasksFieldFilled ||
                !areTheRestOfTheFieldsField ||
                isAddingNewTask ||
                isEditingTask
              }
            >
              {taskToEdit
                ? isEditingTask
                  ? "Making changes..."
                  : "Update Task"
                : isAddingNewTask
                  ? "Creating task..."
                  : "Create New Task"}
            </button>
          </motion.form>

          <div
            className="fixed h-screen w-full"
            onClick={() => dispatch(handleAddNewTaskModalToggle(false))}
          />
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

// theme, and closing of side bar

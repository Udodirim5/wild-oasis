/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { createCabin, isCreatingCabin } = useCreateCabin();
  const { editCabin, isEditing } = useUpdateCabin();
  const { errors } = formState;

  const handleSubmitFn = (data) => {
    const image =
      typeof data.image === "string" ? data.image : data.image?.[0] || null;

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.()
          },
        }
      );
    }
  };

  const isProcessing = isEditSession ? isEditing : isCreatingCabin;

  const onErrorFn = (error) => {
    console.log(error);
  };

  return (
    <Form onSubmit={handleSubmit(handleSubmitFn, onErrorFn)}>
      <FormRow label="Cabin name" htmlFor="name" errors={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isProcessing}
          {...register("name", {
            required: " Cabin name is required",
            maxLength: { value: 50, message: "Must be 50 characters or less" },
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        htmlFor="maxCapacity"
        errors={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isProcessing}
          min={0}
          {...register("maxCapacity", {
            required: " Maximum capacity is required",
            min: { value: 1, message: "Must be at least 1" },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        htmlFor="regularPrice"
        errors={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isProcessing}
          min={0}
          {...register("regularPrice", {
            required: " Regular price is required",
            min: { value: 1, message: "Must be at least 1" },
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        htmlFor="discount"
        errors={errors?.discount?.message}
      >
        <Input
          type="number"
          id="discount"
          min={0}
          disabled={isProcessing}
          defaultValue={0}
          {...register("discount", {
            required: "Discount is required",
            validate: (value) => {
              const price = Number(getValues().regularPrice);
              if (value < 0) return "Discount must be a positive number";
              if (value >= price)
                return "Discount must be less than the regular price";
              return true;
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        htmlFor="description"
        errors={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Description is required",
          })}
        />
      </FormRow>

      <FormRow
        label="Cabin photo"
        htmlFor="image"
        errors={errors?.image?.message}
      >
        <FileInput
          disabled={isProcessing}
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Image is required", // if editing, image is not required
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          onClick={() => onCloseModal?.()}
          variation="secondary"
          disabled={isProcessing}
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isProcessing}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

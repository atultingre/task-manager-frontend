import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import { Textbox, Loader, Button } from "../Components";

const ChangePassword = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning("Passwod doesn't match");
      return;
    }
    try {
      const res = await changePassword(data).unwrap();
      toast.success("New User added successfully");

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            Change Password
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="New Password"
              type="password"
              name="password"
              label="New Password"
              className="w-full rounded"
              register={register("password", {
                required: "New Password is required!",
              })}
              error={errors.password ? errors.password.message : ""}
            />
            <Textbox
              placeholder="Conform New Password"
              type="password"
              name="cpass"
              label="Confirm New Password"
              className="w-full rounded"
              register={register("cpass", {
                required: "Confirm New Password is required!",
              })}
              error={errors.cpass ? errors.cpass.message : ""}
            />
          </div>
          {isLoading ? (
            <div className="py-5">
              <Loader />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                className="bg-blue-600 px-8 font-semibold text-white hover:bg-blue-700"
                label="Save"
              />
              <button
                type="button"
                className="bg-white px-5 text-sm  font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default ChangePassword;

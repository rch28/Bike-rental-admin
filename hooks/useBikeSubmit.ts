import { successResponse } from "@/Auth/types/common";
import BikeServices from "@/Bikes/services/BikeServices";
import { bikeType } from "@/Bikes/types/bikeSchema";
import { AxiosError } from "axios";
import { SubmitHandler, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";

const useBikeSubmit = () => {
  const { handleSubmit, watch, setValue, formState } =
    useFormContext<bikeType>();
  const watchImage = watch("image");
  const onSubmit: SubmitHandler<bikeType> = async (data) => {
    // if not image is selected, set image to null
    if (!watchImage) {
      delete data.image;
    }

    const newPromise: Promise<successResponse> = new Promise(
      async (resolve, reject) => {
        try {
          const response = await BikeServices.postBike(data);
          resolve(response);
        } catch (error) {
          console.log("error", error);
          if (error instanceof AxiosError && error.response?.data) {
            const errMsg =
              error?.response?.data?.detail || error?.response?.data?.data;
            reject(errMsg);
          } else if (error instanceof Error) {
            reject(error?.message);
          } else {
            reject("Network Error!!");
          }
        }
      }
    );
    toast.promise(newPromise, {
      loading: "Loading",
      success: (res) => res.success || "Bike added successfully",
      error: (err) => err || "Failed to add bike",
    });
  };
  return {
    handleSubmit: handleSubmit(onSubmit),
    watch,
    formState,
  };
};

export default useBikeSubmit;

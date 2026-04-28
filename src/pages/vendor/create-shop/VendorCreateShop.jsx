import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ChevronRight, LinkIcon, Mail, Plus, Store, X } from "lucide-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";
import { useCreateShopMutation } from "../../../features/shop/shopApi";
import OutletModal from "./components/OutletModal";
import { useHandleCurrentLoggedInUserQuery } from "../../../features/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "../../../features/auth/authSlice";

const VendorCreateShop = () => {
  const { user } = useSelector((state) => state?.auth);
  const [logoPreview, setLogoPreview] = useState(null);
  const [outlets, setOutlets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createShop, { isLoading, error, isSuccess }] = useCreateShopMutation();
  const { data: currentUser, isLoading: currentUserLoading, refetch: refetchCurrentUser } = useHandleCurrentLoggedInUserQuery();

  useEffect(() => {
    if (currentUser) {
      dispatch(userLoggedIn(currentUser?.data));
      if (currentUser?.data?.isShopCreated === true) {
        navigate('/shop-overview');
      }
    }
  }, [currentUser, dispatch, navigate]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Shop created successfully!");
      navigate('/approval');
    }
    if (error) {
      const message = error?.data?.message || "Shop created failed!";
      toast.error(message);
    }
  }, [navigate, isSuccess, error,]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { control, register, handleSubmit, setValue, clearErrors, formState: { errors } } = useForm({
    defaultValues: {
      description: "",
      outlets: [],
    }
  });

  useEffect(() => {
    register("businessLogo", {
      validate: (value) => Boolean(value) || "Business logo is required",
    });
    register("outlets", {
      validate: (value) =>
        Array.isArray(value) && value.length > 0 || "Location details are required",
    });
  }, [register]);

  useEffect(() => {
    setValue("outlets", outlets, { shouldValidate: outlets.length > 0 });
  }, [outlets, setValue]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("businessLogo", file, { shouldValidate: true });
      clearErrors("businessLogo");
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (currentUserLoading) {
    return <p>Loading....</p>
  }

  const removeLogo = () => {
    setLogoPreview(null);
    setValue("businessLogo", null, { shouldValidate: true });
  };

  const handleAddOutlet = (newOutlet) => {
    setOutlets([...outlets, newOutlet]);
    setShowModal(false);
  };

  const onSubmit = async (data) => {
    const shopData = {
      shop: {
        business_name: data.businessName,
        business_phone: {
          country_code: data.countryCode,
          phone_number: data.phoneNumber,
        },
        description: data.description,
      },
      outlet: data.outlets
    };

    if (data?.website) {
      shopData.shop.website = data.website
    }

    const formData = new FormData();
    formData.append("data", JSON.stringify(shopData));
    formData.append("file", data.businessLogo);

    try {
      await createShop(formData).unwrap();

      try {
        const refreshedUser = await refetchCurrentUser().unwrap();
        if (refreshedUser?.data) {
          dispatch(userLoggedIn(refreshedUser.data));
        }
      } catch {
        // The mutation already invalidates the user cache; navigation can continue.
      }
    } catch {
      // const message = error?.data?.message || "Shop created failed!";
      // console.log("");
    }
  };


  console.log(currentUser);
  console.log(user);

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 pt-32 pb-12">
      <div className="max-w-300 mx-auto">
        <div className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-bold tracking-normal text-[#262626] sm:text-[32px]">Create Your Vendor Account</h1>
          <p className="mt-2 text-base text-[#737373]">
            Set up your business profile and start offering amazing deals to customers.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="space-y-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div>
              <h2 className="text-xl font-bold text-primary">Business Details</h2>
            </div>

            <div className="space-y-2">
              <label className="block text-lg font-medium text-[#262626]">Business Name<span className="text-red-500">*</span></label>
              <div className="relative">
                <Store className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.businessName ? 'text-red-400' : 'text-gray-400'}`} />
                <input
                  {...register("businessName", { required: "Business name is required" })}
                  placeholder="Enter your business name"
                  className={`w-full rounded-full border bg-white py-4 pl-12 pr-4 text-[#262626] outline-none transition-all focus:ring-4 focus:ring-primary/10 ${errors.businessName ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-primary'}`}
                />
              </div>
              {errors.businessName && <p className="text-red-500 text-sm mt-1 ml-4">{errors.businessName.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-medium text-[#262626]">Description<span className="text-red-500">*</span></label>
              <div className="relative">
                <textarea
                  {...register("description", {
                    validate: (value) => {
                      const description = value?.trim() || "";

                      if (!description) return "Description is required";
                      if (description.length < 10) return "Description must be minimum 10 characters";

                      return true;
                    },
                  })}
                  placeholder="Business Description"
                  rows="5"
                  className={`w-full resize-none rounded-lg border bg-white p-5 text-[#262626] outline-none transition-all focus:ring-4 focus:ring-primary/10 ${errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-slate-300 focus:border-primary'}`}
                />
              </div>
              {errors.description && <p className="text-red-500 text-sm mt-1 ml-4">{errors.description.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-lg font-medium text-[#262626]">Business Logo<span className="text-red-500">*</span></label>
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <div className="relative">
                  {logoPreview ? (
                    <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-inner">
                      <img src={logoPreview} alt="Preview" className="h-full w-full object-contain" />
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1.5 text-white shadow-lg transition-transform hover:bg-red-600 active:scale-90"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 text-gray-400 transition-all hover:border-[#2B9DAE]/50 hover:bg-white">
                      <Plus className="w-10 h-10 mb-2 text-gray-300" />
                      <span className="text-sm font-medium">Upload Photos</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#737373]">JPEG, PNG or PDF max 10 MB</span>
                  <label className="flex w-fit cursor-pointer items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-secondary active:scale-95">
                    <Plus className="w-5 h-5" /> Upload from files
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
              </div>
              {errors.businessLogo && <p className="text-red-500 text-sm mt-1 ml-4">{errors.businessLogo.message}</p>}
            </div>
          </div>
          <div className="space-y-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div>
              <h2 className="text-xl font-bold text-primary">Profile Details</h2>
            </div>

            <div className="space-y-2">
              <h2 className="block text-lg font-medium text-[#262626]">Contact Information<span className="text-red-500">*</span></h2>
              <Controller
                name="phone"
                control={control}
                rules={{
                  validate: (value) =>
                    value?.replace(/\D/g, "").length > 1 || "Contact information is required",
                }}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    country={"us"}
                    onlyCountries={["us"]}
                    enableSearch
                    value={value}
                    containerClass="w-full"
                    inputClass={`!w-full !h-14 !rounded-full !border !bg-white !py-4 !pl-14 !pr-4 !text-[#262626] !outline-none !transition-all ${errors.phone ? '!border-red-500 focus:!border-red-500 focus:!ring-4 focus:!ring-red-100' : '!border-slate-300 focus:!border-primary focus:!ring-4 focus:!ring-primary/10'}`}
                    buttonClass={`!rounded-l-full !border !bg-white !px-3 ${errors.phone ? '!border-red-500' : '!border-slate-300'}`}
                    onChange={(value, country) => {
                      const dialCode = country.dialCode;
                      const phoneNumber = value.slice(dialCode.length);

                      setValue("countryCode", `+${dialCode}`);
                      setValue("phoneNumber", phoneNumber);

                      onChange(value);
                    }}
                  />
                )}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1 ml-4">{errors.phone.message}</p>}
            </div>
            <div className="space-y-4">
              <h2 className="block text-lg font-medium text-[#262626]">Location Details<span className="text-red-500">*</span></h2>
              <p className="text-[#737373] text-base leading-relaxed pb-2">
                If you operate a single Location, click "Single Location" and enter its address and location details to continue.
              </p>
              <div className={`space-y-4 rounded-lg border bg-slate-50 p-4 ${errors.outlets ? 'border-red-500' : 'border-slate-200'}`}>
                {outlets.length === 0 && (
                  <p className="text-center text-gray-400 py-2 italic">No Location added yet.</p>
                )}
                {outlets.map((item, idx) => (
                  <div key={idx} className="group flex cursor-pointer items-center justify-between rounded-lg border border-transparent bg-white p-4 transition-colors hover:border-[#4BBDCF]/20 hover:bg-[#F8FAFC]">
                    <div className="flex items-center gap-4">
                      <div className="text-primary">
                        <Store size={22} />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <span className="font-bold text-primary text-lg whitespace-nowrap">Location {idx + 1}:</span>
                        <span className="text-[#737373] text-base truncate max-w-50 sm:max-w-xs">{item.address}</span>
                      </div>
                    </div>
                    <ChevronRight className="text-gray-300 group-hover:text-secondary transition-colors" size={24} />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-lg font-bold text-white shadow-md transition-all hover:bg-secondary active:scale-[0.99]">
                  <Plus size={24} /> Add Location
                </button>
              </div>
              {errors.outlets && <p className="text-red-500 text-sm mt-1 ml-4">{errors.outlets.message}</p>}
              <div className="space-y-2 pt-2">
                <label className="block text-lg font-medium text-[#262626]">Website Link (Optional)</label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    {...register("website")}
                    placeholder="Website link"
                    className="w-full rounded-full border border-slate-300 bg-white py-4 pl-12 pr-4 text-[#262626] outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center border-t border-slate-200 pt-6 lg:col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex min-w-60 cursor-pointer items-center justify-center rounded-full bg-primary px-12 py-3.5 text-lg font-bold text-white shadow-xl shadow-[#4BBDCF]/20 transition-all hover:bg-secondary active:scale-95 disabled:cursor-not-allowed disabled:opacity-70">
              {isLoading ? (
                <div className="spinner-border animate-spin border-2 border-t-4 border-white w-6 h-6 rounded-full"></div>
              ) : (
                <span className="font-medium text-lg text-[#FFFFFF]">Submit for Approval</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Outlet Modal */}
      {showModal && (
        <OutletModal
          onClose={() => setShowModal(false)}
          onSave={handleAddOutlet}
        />
      )}
    </div>
  );
};

export default VendorCreateShop;

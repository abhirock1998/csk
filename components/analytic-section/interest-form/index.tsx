"use client";

import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import UploadFile from "./upload";
import TabBar from "../../ui/tab/tab";
import { FieldErrorMessage, Field } from "../../ui/text-field";
import CountryPhoneInput, { CountryPhoneInputRef } from "./country-input";
import { buySellFormSchema, BuySellFormType } from "@/schema/buy-sell";
import { useStockStore } from "@/store/stock";

type FormTab = "BUY" | "SELL" | "UPLOAD";

const BuySellForm = () => {
  const [activeTab, setActiveTab] = useState<FormTab>("BUY");
  const [disabledBtn, setDisableBtn] = useState(false);
  const { price } = useStockStore();

  const phoneRef = useRef<CountryPhoneInputRef>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset: resetForm,
    formState: { errors },
  } = useForm<BuySellFormType>({
    resolver: zodResolver(buySellFormSchema),
  });

  const onSubmit = async (value: BuySellFormType) => {
    try {
      setDisableBtn(true);
      const response = await axios.post("/api/interest", {
        ...value,
        intendFor: activeTab,
      });

      if (response.status === 201) {
        resetForm();
        phoneRef.current?.resetState();
        toast.success("Your interest has been submitted successfully! 🎉");
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setDisableBtn(false);
    }
  };

  return (
    <div className="border border-[#1818181a] rounded-lg w-full h-full flex flex-col">
      {/* Tabs for Buy and Sell */}
      <div className="flex border-b border-[#1818181a]">
        <TabBar<FormTab>
          id="BUY"
          activeTabId={activeTab}
          onClick={setActiveTab}
          title="Buy"
          className="px-[30px]"
        />

        <TabBar<FormTab>
          id="SELL"
          activeTabId={activeTab}
          onClick={setActiveTab}
          title="Sell"
          className="px-[30px]"
        />

        <TabBar<FormTab>
          id="UPLOAD"
          activeTabId={activeTab}
          onClick={setActiveTab}
          title="Upload"
          className="px-[30px]"
        />
      </div>

      {/* Share Title and Price */}
      {activeTab === "UPLOAD" ? (
        <div className="p-4 flex-1 max-w-96 mx-auto">
          <UploadFile />
        </div>
      ) : (
        <div className="p-4">
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-text_color mb-4">
              Chennai Super Kings (CSK) Shares
            </h2>

            <p className="text-[1rem] font-medium text-secondary_text">
              {activeTab === "BUY" ? `₹ ${price}` : "* Best in Industry"}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
            <Field
              type="text"
              register={register("name")}
              placeholder="Name"
              error={errors.name?.message}
            />
            <Field
              type="email"
              placeholder="Email"
              {...register("email")}
              error={errors.email?.message}
            />
            <CountryPhoneInput
              ref={phoneRef}
              onSelected={(phone) => {
                console.log("PHONE CODE", phone);
                setValue("phone", `${phone.dial_code} ${phone.phone}`);
              }}
            />
            <FieldErrorMessage message={errors.phone?.message} />
            <Field
              type="number "
              placeholder="Quantity"
              {...register("quantity")}
              error={errors.quantity?.message}
            />
            <Field
              as="textarea"
              placeholder="Message"
              rows={3}
              {...register("message")}
            />

            <button
              disabled={disabledBtn}
              type="submit"
              className="w-full bg-green-500 text-white font-medium py-3 rounded-[99px] hover:bg-brand_color transition capitalize disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-brand_color/70"
            >
              {activeTab.toLowerCase()}
            </button>
          </form>

          <button
            type="button"
            className="w-full flex items-center justify-center border py-3 gap-2 rounded-[99px] text-text_color font-medium transition mt-4 hover:bg-whatsapp hover:text-shade"
          >
            <Image
              src="https://cdn.prod.website-files.com/66dab781497d9a528975cd7a/678b78d87140ff853f2c831c_whatsapp-logo-webflow-cloneable-template-brix-templates.svg"
              width={28}
              height={28}
              alt="whatsapp"
              className="object-contain"
            />
            Get Connected Now
          </button>
        </div>
      )}
    </div>
  );
};

export default BuySellForm;

import React, { forwardRef, useImperativeHandle, useState } from "react";

import { classNames } from "@/utils/style";
import useClickOutside from "@/hooks/useClickOutside";

import country, { initialCountry } from "@/constants/country";

type CountryData = (typeof country)[0];

interface CountryPhoneInputProps {
  onSelected: (country: CountryData & { phone: string }) => void;
}

export interface CountryPhoneInputRef {
  resetState: () => void;
}

const CountryPhoneInput = forwardRef<
  CountryPhoneInputRef,
  CountryPhoneInputProps
>(({ onSelected }, forwardReference) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() =>
    setIsDropDownOpen(false)
  );
  const [selectedCountry, setSelectedCountry] =
    useState<CountryData>(initialCountry);

  const openDropDown = () => setIsDropDownOpen(true);

  const closeDropDown = () => setIsDropDownOpen(false);

  useImperativeHandle(forwardReference, () => ({
    resetState: () => {
      setPhoneNumber("");
      setIsDropDownOpen(false);
      setSelectedCountry(initialCountry);
    },
  }));

  return (
    <div
      ref={forwardReference as any}
      className="relative w-full rounded-md focus-within:ring-2 focus-within:ring-green-500"
    >
      <div className="flex items-center border p-2 rounded-md focus-within::ring-2 focus-within:ring-green-500">
        <button
          type="button"
          onClick={openDropDown}
          className="flex items-center space-x-1 px-2 rounded-md focus:outline-none"
        >
          <span>{selectedCountry.flag}</span>

          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <input
          type="tel"
          placeholder="081234 56789"
          value={phoneNumber}
          onChange={({ target: { value } }) => {
            setPhoneNumber(value);
            onSelected({ ...selectedCountry, phone: value });
          }}
          className="w-full pl-3 focus:outline-none"
        />

        {isDropDownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-[90%] left-0 right-0 mt-2 w-full  bg-white max-h-52 overflow-auto border rounded-md shadow-lg z-10"
          >
            {country.map((item, index) => {
              const mergeClass = classNames(
                "flex items-center gap-x-2 w-full px-3 py-2 hover:bg-gray-100",
                selectedCountry.dial_code === item.dial_code && "bg-brand_color"
              );
              return (
                <button
                  key={index}
                  type="button"
                  className={mergeClass}
                  onClick={() => {
                    setSelectedCountry(item);
                    onSelected({ ...item, phone: phoneNumber });
                    closeDropDown();
                  }}
                >
                  <span className="">{item.flag}</span>
                  <span
                    title={item.name}
                    className="text-text_color font-medium text-[14px] truncate max-w-[60%] text-left"
                  >
                    {item.name}
                  </span>
                  <span className="text-secondary_text font-normal text-[13px]">
                    ({item.dial_code})
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

export default CountryPhoneInput;

import {ChangeEvent, TextareaHTMLAttributes} from "react";

export function Textarea({maxLength, ...props}: TextareaHTMLAttributes<HTMLTextAreaElement> & { maxLength: number }) {

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        if (newValue.length <= maxLength) {
            if (props.onChange) {
                props.onChange(event);
            }
        }
    };

    return (
        <div className="relative">
          <textarea
              className="w-full resize-none text-sm p-4 border border-gray-500 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-green-200"
              {...props}
              onChange={handleChange}
              maxLength={maxLength}

          />
            <div className="absolute bottom-4 right-4 text-sm text-gray-400 ">
                {typeof props.value === 'string' ? props.value.length : 0}/{maxLength}
            </div>
        </div>
    );
}
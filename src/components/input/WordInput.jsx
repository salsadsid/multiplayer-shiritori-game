import { forwardRef, memo } from "react";

const WordInput = forwardRef(function WordInput(
  { onChangeHandle, value, onEnterPressHandle, onBlurHandle },
  ref
) {
  return (
    <input
      type="text"
      ref={ref}
      value={value}
      className="py-2 px-1.5 rounded-sm border focus:border-blue-600"
      onChange={(e) => onChangeHandle(e, e.target.value)}
      onKeyDown={onEnterPressHandle}
      minLength={4}
      onBlur={onBlurHandle}
      required
    />
  );
});

export default memo(WordInput);

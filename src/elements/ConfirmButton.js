import { useState } from "react";

import { Button } from "@nextui-org/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function ConfirmButton(originalProps) {
  const { onPress: activate, ...props } = originalProps;
  const isIconOnly = props.isIconOnly;

  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const confirm = async () => {
    if (isConfirming && !isLoading) {
      setIsLoading(true);
      await activate();
      setIsLoading(false);
      return;
    }

    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
    }, 5000);
  };

  props.onPress = confirm;

  return (
    <Button
      {...props}
      isLoading={isLoading}
      variant={isConfirming ? "shadow" : props.variant}
      color={(isConfirming && props.confirmColor) || props.color}
    >
      {isConfirming ? (
        isIconOnly ? (
          <FontAwesomeIcon icon={faCheck} />
        ) : (
          "Are you sure?"
        )
      ) : (
        props.children
      )}
    </Button>
  );
}

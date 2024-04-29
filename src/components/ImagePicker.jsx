import React, { useState } from "react";

import { Flex } from "./Flex";
import { Text } from "./Text";

export const ImagePicker = ({ image, setImage }) => {
  const [checkBox, setCheckBox] = useState(false);

  // console.log(image);

  return (
    <div>
      <Flex direction={"flex-col"} gap={"gap-3"}>
        <Flex direction={"flex-col"}>
          <Text>Fotoğraf ekleyecek misiniz?</Text>
          <Flex direction={"flex-row"} gap={"gap-2"}>
            <input
              type="radio"
              id="yes"
              value="true"
              onChange={(e) => setCheckBox(e.target.value === "true")}
              checked={checkBox}
            />
            <label htmlFor="yes">Evet</label>
          </Flex>
          <Flex direction={"flex-row"} gap={"gap-2"}>
            <input
              type="radio"
              id="no"
              value="false"
              onChange={(e) => setCheckBox(e.target.value === "true")}
              checked={!checkBox}
            />
            <label htmlFor="no">Hayır</label>
          </Flex>
        </Flex>
        <Flex>
          {checkBox && (
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          )}
        </Flex>
      </Flex>
    </div>
  );
};

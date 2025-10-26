import React from "react";
import { FaSearch } from "react-icons/fa";
import { Button } from "../Ui/Button";
import { Input, InputContainer } from "../Ui/Input";
import Form from "../Ui/Form";

export default function SearchBoxMenu({ value }: { value?: string }) {
  return (
    <div className="flex justify-center mt-5">
      <Form variant="primary" action="/search">
        <div className="flex gap-4">
          <Button
            type="submit"
            title="search"
            variant="secondary"
            StartIcon={FaSearch}
          />
          <InputContainer>
            <Input
              type="search"
              placeholder="جستجو در منو"
              name="q"
              spellCheck="false"
              value={value}
              autoComplete="off"
              title="search"
            />
          </InputContainer>
        </div>
      </Form>
    </div>
  );
}

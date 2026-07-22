import React from "react";
import { FaSearch } from "react-icons/fa";
import { Button } from "../Element/Button";
import { Input, InputContainer } from "../Element/Input";
import Form from "../Element/Form";

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
              defaultValue={value}
              autoComplete="off"
              title="search"
            />
          </InputContainer>
        </div>
      </Form>
    </div>
  );
}

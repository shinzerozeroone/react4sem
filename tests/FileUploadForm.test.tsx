//@ts-nocheck

import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import FileUploadForm from "../src/components/FileUploadForm";
import { describe, test, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { saveAs } from "file-saver";
import { MemoryRouter } from "react-router-dom";

vi.mock("@react-pdf/renderer", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, any>; // Приводим actual к объектному типу
  return {
    ...actual, // Оригинальные экспорты
    BlobProvider: ({ children }: { children: any }) => <div>{children({ loading: false })}</div>,
    pdf: vi.fn(() => ({
      toBlob: vi.fn(() => Promise.resolve(new Blob())),
    })),
  };
});

beforeAll(() => {
  global.URL.createObjectURL = vi.fn(() => "mocked-url");
});

describe("FileForm", () => {
  test("отображение инпута текста", () => {
    render(
      <MemoryRouter>
        <FileUploadForm />
      </MemoryRouter>,
    );

    // Находим элемент для ввода текста
    const textInput = screen.getByLabelText(/Input Text/i);
    expect(textInput).toBeInTheDocument();
  });

  test("отображение инпута загрузки", () => {
    render(
      <MemoryRouter>
        <FileUploadForm />
      </MemoryRouter>,
    );

    const fileInput = screen.getByLabelText(/Upload File/i);
    expect(fileInput).toBeInTheDocument();
  });
});

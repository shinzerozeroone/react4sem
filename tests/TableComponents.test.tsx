import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import TableComponent from "../src/components/TableComponent";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Spin } from "antd";
import React from "react";
import { vi } from "vitest";

vi.mock("axios");

describe("TableComponent", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <TableComponent />
      </MemoryRouter>,
    );

    // Check if the button is in the document
    expect(screen.getByText(/to pdf form/i)).toBeInTheDocument();
  });
});

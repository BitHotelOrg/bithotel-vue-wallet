import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ConnectButton from "../ConnectButton.vue";

describe("ConnectButton", () => {
  it("renders properly", () => {
    // const wrapper = mount(ConnectButton, { props: { msg: "Hello Vitest" } });
    const wrapper = mount(ConnectButton, { props: {} });
    expect(wrapper.text()).toContain("Connect Button");
  });
});

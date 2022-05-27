import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ChainIcon from "../ChainIcon.vue";

describe("ConnectButton", () => {
  it("renders properly", () => {
    // const wrapper = mount(ConnectButton, { props: { msg: "Hello Vitest" } });
    const wrapper = mount(ChainIcon, { props: {} });
    expect(wrapper.text()).toContain("Connect Button");
  });
});

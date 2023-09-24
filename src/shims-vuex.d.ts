import { ComponentCustomProperties } from "vue";
import { Store } from "@/store";

declare module "@vue/runtime-core" {
  // Declare your own store states.
  interface State {
    your_state: "";
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

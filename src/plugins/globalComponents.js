import { BaseInput, Card, BaseDropdown, BaseButton, BaseCheckbox, BaseAlert } from "../components/index";
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install(Vue) {
    Vue.component(BaseInput.name, BaseInput);
    Vue.component(Card.name, Card);
    Vue.component(BaseDropdown.name, BaseDropdown);
    Vue.component(BaseButton.name, BaseButton);
    Vue.component(BaseCheckbox.name, BaseCheckbox);
    Vue.component(BaseAlert.name, BaseAlert);
  }
};

export default GlobalComponents;

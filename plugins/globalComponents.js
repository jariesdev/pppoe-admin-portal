import Vue from 'vue'
import BaseInput from '@/components/Inputs/BaseInput.vue'
import BaseDropdown from '@/components/BaseDropdown.vue'
import Card from '@/components/Cards/Card.vue'
import TableCard from '@/components/Cards/TableCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseCheckbox from '@/components/Inputs/BaseCheckbox.vue'
import {
  Checkbox,
  CheckboxGroup,
  Col,
  DatePicker,
  Dialog,
  Form,
  FormItem,
  Input,
  InputNumber,
  Option,
  Popover,
  Radio,
  RadioGroup,
  Row,
  Select,
  Table,
  TableColumn,
  TabPane,
  Tabs,
  Tag,
  Tooltip
} from 'element-ui'
import RequiredFieldsText from '~/components/Form/RequiredFieldsText'
import InputDescription from '~/components/Inputs/InputDescription'
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

Vue.component(BaseInput.name, BaseInput)
Vue.component(BaseDropdown.name, BaseDropdown)
Vue.component(Card.name, Card)
Vue.component(TableCard.name, TableCard)
Vue.component(BaseCheckbox.name, BaseCheckbox)
Vue.component(BaseButton.name, BaseButton)
Vue.component(Input.name, Input)
Vue.component(InputNumber.name, InputNumber)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Radio.name, Radio)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(Checkbox.name, Checkbox)
Vue.component(CheckboxGroup.name, CheckboxGroup)
Vue.component(DatePicker.name, DatePicker)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Dialog.name, Dialog)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Tag.name, Tag)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(InputDescription.name, InputDescription)
Vue.component(RequiredFieldsText.name, RequiredFieldsText)
Vue.use(Tooltip)
Vue.use(Popover)

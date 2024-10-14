import dayjs from "dayjs";
import localizeFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'

dayjs.extend(localizeFormat)
dayjs.locale('pt-br')

export { dayjs }
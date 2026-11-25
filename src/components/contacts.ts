// Контакты для заявок — меняются в одном месте для всего сайта
const WHATSAPP_NUMBER = "996779779979";
const WHATSAPP_TEXT = "Здравствуйте! Пишу с сайта Kubik, интересует программа. Хочу попробовать 3 месяца бесплатно.";

// Ссылка открывает чат в WhatsApp с уже набранным первым сообщением
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

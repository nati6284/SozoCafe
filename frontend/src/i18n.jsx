import { createContext, useContext, useMemo, useState } from 'react'
const words = {
  en: {
    home:'Home', menu:'Menu', story:'Our story', contact:'Contact', reserve:'Reserve a table', order:'Order now',
    eyebrow:'A little everyday magic', headline:'Made with care.\nServed with heart.', intro:'Thoughtful coffee, fresh plates, and a welcoming place to slow down and connect.',
    explore:'Explore the menu', favorites:'Guest favorites', favoritesSub:'A few delicious reasons to visit.', viewMenu:'View full menu',
    storyTitle:'A place to feel at home', storyText:'We believe the best moments happen around a table: a first coffee, a long conversation, a meal shared with people you love.',
    fresh:'Freshly prepared', freshText:'Made to order with carefully selected ingredients.',
    local:'Rooted in Ethiopia', localText:'Celebrating local coffee culture and warm hospitality.',
    menuTitle:'Something for every mood', menuSub:'Browse our kitchen and coffee bar.', all:'All', add:'Add to cart',
    cart:'Your order', empty:'Your cart is waiting for something delicious.', checkout:'Place order', name:'Your name', phone:'Phone number',
    orderType:'Order type', pickup:'Pickup', delivery:'Delivery', address:'Delivery address', notes:'Notes for the kitchen', total:'Total',
    reservationTitle:'Save your seat', reservationSub:'Send a reservation request and our team will confirm it.',
    date:'Date', time:'Time', guests:'Guests', message:'Special request', submitReservation:'Request a table',
    contactTitle:'Come say hello', hours:'Opening hours', location:'Find us', whatsapp:'Chat on WhatsApp',
    footer:'Good food. Great coffee. Beautiful moments.', admin:'Admin', qrTitle:'Scan. Browse. Enjoy.', qrSub:'Scan this code to open our digital menu on your phone.',
    successOrder:'Order submitted! Our team will contact you to confirm.', successReservation:'Reservation request sent. We will contact you to confirm.',
    failed:'Something went wrong. Please try again.', categories:{Coffee:'Coffee',Food:'Food',Dessert:'Dessert',Juice:'Juice'}
  },
  am: {
    home:'መነሻ', menu:'ምናሌ', story:'ስለ እኛ', contact:'አድራሻ', reserve:'ጠረጴዛ ይያዙ', order:'አሁን ይዘዙ',
    eyebrow:'የዕለት ደስታ', headline:'በፍቅር ተዘጋጅቶ።\nበልብ ይቀርባል።', intro:'ጥራት ያለው ቡና፣ ትኩስ ምግብ እና ለመዝናናት ምቹ ቦታ።',
    explore:'ምናሌውን ይመልከቱ', favorites:'ተወዳጅ ምርጫዎች', favoritesSub:'ሊጎበኙን የሚያነሳሱ ጣፋጭ ምርጫዎች።', viewMenu:'ሙሉ ምናሌ',
    storyTitle:'እንደ ቤት የሚሰማ ቦታ', storyText:'ምርጥ ጊዜዎች በጠረጴዛ ዙሪያ ይፈጠራሉ ብለን እናምናለን።',
    fresh:'ትኩስ ዝግጅት', freshText:'በጥንቃቄ ከተመረጡ ግብዓቶች በትዕዛዝ ይዘጋጃል።',
    local:'የኢትዮጵያ ሥር', localText:'የአካባቢያችንን የቡና ባህል እና አቀባበል እናከብራለን።',
    menuTitle:'ለሁሉም ስሜት የሚሆን', menuSub:'የምግብ እና የቡና ምርጫችንን ይመልከቱ።', all:'ሁሉም', add:'ወደ ቅርጫት',
    cart:'ትዕዛዝዎ', empty:'ቅርጫትዎ ጣፋጭ ምርጫ ይጠብቃል።', checkout:'ትዕዛዝ ይላኩ', name:'ሙሉ ስም', phone:'ስልክ ቁጥር',
    orderType:'የትዕዛዝ አይነት', pickup:'በአካል መውሰድ', delivery:'ማድረስ', address:'የማድረሻ አድራሻ', notes:'ለማዘጋጃ ማስታወሻ', total:'ጠቅላላ',
    reservationTitle:'ጠረጴዛ ይያዙ', reservationSub:'የያዙትን ጥያቄ ይላኩ፤ ቡድናችን ያረጋግጥልዎታል።',
    date:'ቀን', time:'ሰዓት', guests:'ሰዎች', message:'ልዩ ጥያቄ', submitReservation:'ጠረጴዛ ይጠይቁ',
    contactTitle:'ይጎብኙን', hours:'የሥራ ሰዓት', location:'አድራሻችን', whatsapp:'በዋትስአፕ ያነጋግሩን',
    footer:'ጥሩ ምግብ። ጥሩ ቡና። ውብ ጊዜያት።', admin:'አስተዳዳሪ', qrTitle:'ይቃኙ። ይመልከቱ። ይደሰቱ።', qrSub:'ዲጂታል ምናሌውን በስልክዎ ለመክፈት ይህን ኮድ ይቃኙ።',
    successOrder:'ትዕዛዝዎ ተልኳል! ቡድናችን ለማረጋገጥ ያነጋግርዎታል።', successReservation:'የጠረጴዛ ጥያቄዎ ተልኳል። ለማረጋገጥ እንደውልልዎታለን።',
    failed:'ችግር ተፈጥሯል። እንደገና ይሞክሩ።', categories:{Coffee:'ቡና',Food:'ምግብ',Dessert:'ጣፋጭ',Juice:'ጭማቂ'}
  }
}
const Ctx = createContext(null)
export function I18nProvider({children}) {
  const [lang,setLang] = useState('en')
  const value = useMemo(()=>({lang,setLang,t: key => key.split('.').reduce((a,k)=>a?.[k],words[lang]) ?? key}),[lang])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
export const useI18n = () => useContext(Ctx)

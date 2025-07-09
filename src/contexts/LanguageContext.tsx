
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'pt' | 'makhuwa' | 'sena' | 'changana';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.stories': 'Stories',
    'nav.share': 'Share',
    'nav.communities': 'Communities',
    'nav.map': 'Map',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    'nav.register': 'Get Started',
    
    // Feed page
    'feed.title': 'Our Community Stories',
    'feed.subtitle': 'Discover the beauty and culture of Mozambique',
    'feed.welcome': '✨ Welcome to our community! These stories showcase the rich culture and landscapes of Mozambique. Share your own story to connect with others.',
    'feed.loading': 'Loading stories...',
    'feed.error': 'Could not load stories',
    'feed.retry': 'Please tap to try again.',
    'feed.try_again': 'Try Again',
    
    // Story actions
    'story.support': 'Support',
    'story.supported': 'Supported ❤️',
    'story.connect': 'Connect',
    'story.location': 'Location',
    'story.supported_toast': '❤️ Story supported!',
    'story.supported_desc': 'Thank you for supporting this community story.',
    'story.removed_toast': '✅ Support removed',
    'story.removed_desc': 'You removed your support from this story.',
    'story.connect_toast': '🤝 Request sent!',
    'story.connect_desc': 'Your connection request was sent to the storyteller.',
    'story.map_toast': '📍 View on map',
    'story.map_desc': 'Showing location of {title} on the map.',
    'story.by_author': 'By {author}',
    'story.from_community': 'from {community}',
    
    // Audio controls
    'audio.muted': '🔇 Audio muted',
    'audio.muted_desc': 'Audio playback is now disabled.',
    'audio.unmuted': '🔊 Audio enabled',
    'audio.unmuted_desc': 'Audio playback is now enabled.',
    'audio.mute': 'Mute audio',
    'audio.unmute': 'Enable audio',
    'audio.listen_title': 'Listen to title',
    'audio.listen_welcome': 'Listen to welcome message',
    'audio.listen_story': 'Listen to story',
    
    // Categories
    'category.traditions': 'Traditions',
    'category.crafts': 'Crafts',
    'category.music': 'Music',
    'category.agriculture': 'Agriculture',
    'category.celebrations': 'Celebrations',
    'category.traditional_dances': 'Traditional Dances',
    'category.elder_wisdom': 'Elder Wisdom',
    'category.traditional_clothes': 'Traditional Clothes',
    
    // Auth
    'auth.session_ended': 'Session ended',
    'auth.session_ended_desc': 'Your session was successfully ended.',
    'auth.error': 'Error',
    'auth.logout_error': 'Failed to logout.',
    
    // Common
    'common.anonymous': 'Anonymous',
    'common.community': 'Community',
  },
  pt: {
    // Navigation
    'nav.stories': 'Histórias',
    'nav.share': 'Partilhar',
    'nav.communities': 'Comunidades',
    'nav.map': 'Mapa',
    'nav.profile': 'Perfil',
    'nav.settings': 'Definições',
    'nav.logout': 'Terminar Sessão',
    'nav.login': 'Entrar',
    'nav.register': 'Começar',
    
    // Feed page
    'feed.title': 'Histórias da Nossa Comunidade',
    'feed.subtitle': 'Descubra a beleza e cultura de Moçambique',
    'feed.welcome': '✨ Bem-vindo à nossa comunidade! Estas histórias mostram a rica cultura e paisagens de Moçambique. Partilhe a sua própria história para se conectar com outros.',
    'feed.loading': 'A carregar histórias...',
    'feed.error': 'Não foi possível carregar as histórias',
    'feed.retry': 'Por favor, toque para tentar novamente.',
    'feed.try_again': 'Tentar Novamente',
    
    // Story actions
    'story.support': 'Apoiar',
    'story.supported': 'Apoiado ❤️',
    'story.connect': 'Conectar',
    'story.location': 'Localização',
    'story.supported_toast': '❤️ História apoiada!',
    'story.supported_desc': 'Obrigado por apoiar esta história da comunidade.',
    'story.removed_toast': '✅ Apoio removido',
    'story.removed_desc': 'Removeu o seu apoio desta história.',
    'story.connect_toast': '🤝 Pedido enviado!',
    'story.connect_desc': 'O seu pedido de conexão foi enviado ao contador da história.',
    'story.map_toast': '📍 Ver no mapa',
    'story.map_desc': 'A mostrar localização de {title} no mapa.',
    'story.by_author': 'Por {author}',
    'story.from_community': 'de {community}',
    
    // Audio controls
    'audio.muted': '🔇 Áudio silenciado',
    'audio.muted_desc': 'A reprodução de áudio está agora desativada.',
    'audio.unmuted': '🔊 Áudio ativado',
    'audio.unmuted_desc': 'A reprodução de áudio está agora ativada.',
    'audio.mute': 'Silenciar áudio',
    'audio.unmute': 'Ativar áudio',
    'audio.listen_title': 'Ouvir título',
    'audio.listen_welcome': 'Ouvir mensagem de boas-vindas',
    'audio.listen_story': 'Ouvir história',
    
    // Categories
    'category.traditions': 'Tradições',
    'category.crafts': 'Artesanato',
    'category.music': 'Música',
    'category.agriculture': 'Agricultura',
    'category.celebrations': 'Celebrações',
    'category.traditional_dances': 'Danças Tradicionais',
    'category.elder_wisdom': 'Sabedoria dos Anciãos',
    'category.traditional_clothes': 'Roupas Tradicionais',
    
    // Auth
    'auth.session_ended': 'Sessão terminada',
    'auth.session_ended_desc': 'A sua sessão foi terminada com sucesso.',
    'auth.error': 'Erro',
    'auth.logout_error': 'Falha ao terminar sessão.',
    
    // Common
    'common.anonymous': 'Anónimo',
    'common.community': 'Comunidade',
  },
  makhuwa: {
    // Navigation
    'nav.stories': 'Mahiku',
    'nav.share': 'Varelana',
    'nav.communities': 'Ekalamu',
    'nav.map': 'Mapa',
    'nav.profile': 'Wuthu',
    'nav.settings': 'Mahiku ya Wuthu',
    'nav.logout': 'Huma',
    'nav.login': 'Winjira',
    'nav.register': 'Wanjira',
    
    // Feed page
    'feed.title': 'Mahiku ya Ekalamu Wethu',
    'feed.subtitle': 'Mwehe vuvaha ni ntamaduni ya Mosambiki',
    'feed.welcome': '✨ Mwakaribu ekalamuni yethu! Mahiku aya anawoneha ntamaduni ni mavaha ya Mosambiki. Varelane ikaya yinu ni allopwe.',
    'feed.loading': 'Olova mahiku...',
    'feed.error': 'Khaani olovisiwa mahiku',
    'feed.retry': 'Namalaka, kina ni wujeribe kina.',
    'feed.try_again': 'Jeribe Kina',
    
    // Story actions
    'story.support': 'Wuninke',
    'story.supported': 'Waninkiwa ❤️',
    'story.connect': 'Wunganisihe',
    'story.location': 'Mahali',
    'story.supported_toast': '❤️ Ikaya yaninkiwa!',
    'story.supported_desc': 'Asante ni wuninke ikaya ya ekalamu.',
    'story.removed_toast': '✅ Wuninke wususiwa',
    'story.removed_desc': 'Mwasusya wuninke winu.',
    'story.connect_toast': '🤝 Omapo watumiwa!',
    'story.connect_desc': 'Omapo winu watumiwa kwa mwene ikaya.',
    'story.map_toast': '📍 Mwehe mapani',
    'story.map_desc': 'Anawoneha mahali pa {title} mapani.',
    'story.by_author': 'Wa {author}',
    'story.from_community': 'wa {community}',
    
    // Audio controls
    'audio.muted': '🔇 Sauti yethewe',
    'audio.muted_desc': 'Sauti khaayipulikiwi.',
    'audio.unmuted': '🔊 Sauti yawesiwe',
    'audio.unmuted_desc': 'Sauti yaasurulliwa.',
    'audio.mute': 'Yetha sauti',
    'audio.unmute': 'Wesa sauti',
    'audio.listen_title': 'Phulikiza mutwe',
    'audio.listen_welcome': 'Phulikiza ukaribisho',
    'audio.listen_story': 'Phulikiza ikaya',
    
    // Categories
    'category.traditions': 'Ntamaduni',
    'category.crafts': 'Viteho',
    'category.music': 'Nyimbo',
    'category.agriculture': 'Ulimi',
    'category.celebrations': 'Mapampo',
    'category.traditional_dances': 'Ngoma za Ntamaduni',
    'category.elder_wisdom': 'Hekima ya Wakongwe',
    'category.traditional_clothes': 'Nguo za Ntamaduni',
    
    // Auth
    'auth.session_ended': 'Othimihe',
    'auth.session_ended_desc': 'Othimihe vavaha.',
    'auth.error': 'Ovolowe',
    'auth.logout_error': 'Othimihiwa khaani.',
    
    // Common
    'common.anonymous': 'Khaani eyitwa',
    'common.community': 'Ekalamu',
  },
  sena: {
    // Navigation
    'nav.stories': 'Nkhani',
    'nav.share': 'Gawanani',
    'nav.communities': 'Anthu',
    'nav.map': 'Mapu',
    'nav.profile': 'Mbiri',
    'nav.settings': 'Zosintha',
    'nav.logout': 'Tuluka',
    'nav.login': 'Lowani',
    'nav.register': 'Lembetsani',
    
    // Feed page
    'feed.title': 'Nkhani za Anthu Athu',
    'feed.subtitle': 'Onani kukongola ndi chikhalidwe cha Mozambique',
    'feed.welcome': '✨ Takulandirani ku anthu athu! Nkhani izi zikusonyeza chikhalidwe ndi kukongola kwa Mozambique. Gawanani nkhani yanu kuti mugwirizane ndi anzanu.',
    'feed.loading': 'Tikuverenga nkhani...',
    'feed.error': 'Sitingathe kuverenga nkhani',
    'feed.retry': 'Chonde, dindani kuti muyeseni.',
    'feed.try_again': 'Yesaninso',
    
    // Story actions
    'story.support': 'Thandizani',
    'story.supported': 'Wathandizidwa ❤️',
    'story.connect': 'Lumikizani',
    'story.location': 'Malo',
    'story.supported_toast': '❤️ Nkhani yathandizidwa!',
    'story.supported_desc': 'Zikomo pothandiza nkhani ya anthu.',
    'story.removed_toast': '✅ Thandizo lachotsedwa',
    'story.removed_desc': 'Mwachotsa thandizo lanu.',
    'story.connect_toast': '🤝 Pempho latumizidwa!',
    'story.connect_desc': 'Pempho lanu latumizidwa kwa wokamba nkhani.',
    'story.map_toast': '📍 Onani pa mapu',
    'story.map_desc': 'Tikuonetsa malo a {title} pa mapu.',
    'story.by_author': 'Ndi {author}',
    'story.from_community': 'wochokera ku {community}',
    
    // Audio controls
    'audio.muted': '🔇 Liwu lazimitsidwa',
    'audio.muted_desc': 'Liwu silimveka.',
    'audio.unmuted': '🔊 Liwu layatsidwa',
    'audio.unmuted_desc': 'Liwu likumveka.',
    'audio.mute': 'Zimitsani liwu',
    'audio.unmute': 'Yatsani liwu',
    'audio.listen_title': 'Mverani mutu',
    'audio.listen_welcome': 'Mverani moni',
    'audio.listen_story': 'Mverani nkhani',
    
    // Categories
    'category.traditions': 'Miyambo',
    'category.crafts': 'Misanga',
    'category.music': 'Nyimbo',
    'category.agriculture': 'Ulimi',
    'category.celebrations': 'Zikondwerero',
    'category.traditional_dances': 'Zovina za Miyambo',
    'category.elder_wisdom': 'Nzeru za Akuluakulu',
    'category.traditional_clothes': 'Zovala za Miyambo',
    
    // Auth
    'auth.session_ended': 'Tamaliza',
    'auth.session_ended_desc': 'Tamaliza bwino.',
    'auth.error': 'Vuto',
    'auth.logout_error': 'Sitinathe kutuluka.',
    
    // Common
    'common.anonymous': 'Wosadziwika',
    'common.community': 'Anthu',
  },
  changana: {
    // Navigation
    'nav.stories': 'Mintsheketo',
    'nav.share': 'Avelana',
    'nav.communities': 'Vaaki',
    'nav.map': 'Mapa',
    'nav.profile': 'Xivumbiwa',
    'nav.settings': 'Swilo swo cinca',
    'nav.logout': 'Humela',
    'nav.login': 'Nghena',
    'nav.register': 'Tsarisa',
    
    // Feed page
    'feed.title': 'Mintsheketo ya Vaaki va Hina',
    'feed.subtitle': 'Vonani ku saseka ni ndlela ya Mozambique',
    'feed.welcome': '✨ Ni amukela eka vaaki va hina! Mintsheketo leyi yi kombisa ndlela ni ku saseka ka Mozambique. Avelanani ntsheketo wa n\'wina ku hlanganisa na van\'wana.',
    'feed.loading': 'Hi karhi hi lava mintsheketo...',
    'feed.error': 'A hi swi kotangi ku lava mintsheketo',
    'feed.retry': 'Kombela, tinyiketa ku ringeta nakambe.',
    'feed.try_again': 'Ringeta Nakambe',
    
    // Story actions
    'story.support': 'Seketela',
    'story.supported': 'Wu seketeriwile ❤️',
    'story.connect': 'Hlanganisa',
    'story.location': 'Ndhawu',
    'story.supported_toast': '❤️ Ntsheketo wu seketeriwile!',
    'story.supported_desc': 'Inkomu hi ku seketela ntsheketo wa vaaki.',
    'story.removed_toast': '✅ Ku seketela ku susiwile',
    'story.removed_desc': 'U susile ku seketela ka wena.',
    'story.connect_toast': '🤝 Kombelo ri rhumeriwe!',
    'story.connect_desc': 'Kombelo ra wena ri rhumeriwe eka muxaxi wa ntsheketo.',
    'story.map_toast': '📍 Vona eka mapa',
    'story.map_desc': 'Hi kombisa ndhawu ya {title} eka mapa.',
    'story.by_author': 'Hi {author}',
    'story.from_community': 'wa {community}',
    
    // Audio controls
    'audio.muted': '🔇 Rito ri rhuriwile',
    'audio.muted_desc': 'Rito a ri tirhisi.',
    'audio.unmuted': '🔊 Rito ri tirhisiwe',
    'audio.unmuted_desc': 'Rito ri tirhisa.',
    'audio.mute': 'Rhurisa rito',
    'audio.unmute': 'Tirhaisa rito',
    'audio.listen_title': 'Yingisela nhlokomhaka',
    'audio.listen_welcome': 'Yingisela rivongolose',
    'audio.listen_story': 'Yingisela ntsheketo',
    
    // Categories
    'category.traditions': 'Mindhavuko',
    'category.crafts': 'Swilo swo endla',
    'category.music': 'Marito',
    'category.agriculture': 'Vurimi',
    'category.celebrations': 'Mintlangu',
    'category.traditional_dances': 'Swinevelo swa Mindhavuko',
    'category.elder_wisdom': 'Vutivi bya Vakulu',
    'category.traditional_clothes': 'Mintshaho ya Mindhavuko',
    
    // Auth
    'auth.session_ended': 'Ku hetile',
    'auth.session_ended_desc': 'Ku hetile kahle.',
    'auth.error': 'Xiphiqo',
    'auth.logout_error': 'A hi swi kotangi ku humela.',
    
    // Common
    'common.anonymous': 'Lowu a nga tivekiki',
    'common.community': 'Vaaki',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && ['en', 'pt', 'makhuwa', 'sena', 'changana'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const t = (key: string, params?: Record<string, string>) => {
    let translation = translations[language][key] || translations.pt[key] || translations.en[key] || key;
    
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{${param}}`, params[param]);
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

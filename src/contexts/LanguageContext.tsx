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
    
    // Hero section
    'hero.title': 'Nossa Voz',
    'hero.mozambique': 'Mozambique',
    'hero.subtitle': 'A platform where rural communities share their stories, traditions, and way of life',
    'hero.share_story': 'Share Your Story',
    
    // Tabs
    'tabs.stories': 'Community Stories',
    'tabs.languages': 'Our Languages',
    'tabs.gallery': 'Community Gallery',
    
    // Stories section
    'stories.title': 'Stories from Our Communities',
    'stories.subtitle': 'Real stories from real people sharing their culture, traditions, dances, and daily life in rural Mozambique',
    
    // Call to action
    'cta.join_title': 'Join Our Community',
    'cta.join_desc': 'Do you have a story to tell? Share your traditions, culture, dances, and way of life with the world.',
    'cta.share_button': 'Share Your Story',
    
    // Languages section
    'languages.title': 'Languages of Mozambique',
    'languages.subtitle': 'Celebrating the linguistic diversity across our beautiful country',
    'languages.hero_alt': 'Languages of Mozambique',
    'languages.hero_title': 'Multilingual Mozambique',
    'languages.hero_subtitle': 'Welcome in many languages',
    'languages.portuguese': 'Portuguese',
    'languages.official': 'Official Language',
    'languages.portuguese_desc': 'The official language of Mozambique, used in education, government, and formal communication.',
    'languages.makhuwa': 'Makhuwa',
    'languages.northern': 'Northern Mozambique',
    'languages.makhuwa_desc': 'The most widely spoken Bantu language in Mozambique, primarily in Nampula and Cabo Delgado provinces.',
    'languages.changana': 'Changana',
    'languages.southern': 'Southern Mozambique',
    'languages.changana_desc': 'Spoken mainly in Gaza and Maputo provinces, part of the Tsonga language family.',
    'languages.sena': 'Sena',
    'languages.central': 'Central Mozambique',
    'languages.sena_desc': 'Primarily spoken in Sofala province, along the Zambezi River valley.',
    'languages.ndau': 'Ndau',
    'languages.manica_sofala': 'Manica & Sofala',
    'languages.ndau_desc': 'Spoken in the mountainous regions of Manica and parts of Sofala province.',
    'languages.nyanja': 'Nyanja',
    'languages.tete': 'Tete Province',
    'languages.nyanja_desc': 'Common in Tete province, especially near the borders with Malawi and Zambia.',
    'languages.preserve_title': 'Preserve Our Languages',
    'languages.preserve_desc': 'Help us document and preserve the rich linguistic heritage of Mozambique by sharing stories in your native language.',
    'languages.preserve_button': 'Share in Your Language',
    
    // Gallery section
    'gallery.title': 'Community Gallery',
    'gallery.subtitle': 'Photos shared by our communities showcasing their traditions, culture, and celebrations',
    
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
    'story.by_author': 'by {author}',
    'story.supported_toast': '❤️ Story supported!',
    'story.supported_desc': 'Thank you for supporting this community story.',
    'story.removed_toast': '✅ Support removed',
    'story.removed_desc': 'You removed your support from this story.',
    'story.connect_toast': '🤝 Request sent!',
    'story.connect_desc': 'Your connection request was sent to the storyteller.',
    'story.share_title': 'Share Your Story',
    'story.share_desc': 'Story sharing feature coming soon! Your voice matters to us.',
    'story.liked_title': 'Story Liked!',
    'story.liked_desc': 'You liked "{title}"',
    'story.connecting_title': 'Connecting...',
    'story.connecting_desc': 'Connecting with {community} community',
    
    // Map page
    'map.title': 'Community Map',
    'map.subtitle': 'Explore stories and communities across Moçambique',
    'map.integration_title': 'Google Maps Integration',
    'map.integration_desc': 'Interactive map with community locations coming soon. For now, explore our featured locations below.',
    'map.locations_title': 'Locations',
    'map.featured_provinces': 'Featured provinces',
    'map.total_stories': 'Total stories',
    'map.active_communities': 'Active communities',
    'map.stories': 'stories',
    'map.communities': 'communities',
    'map.coordinates': 'Coordinates',
    'map.how_to_use': 'How to Use',
    'map.instruction_1': 'Click on location buttons to see details',
    'map.instruction_2': 'Interactive map integration coming soon',
    'map.instruction_3': 'Stories will be plotted by location',
    'map.instruction_4': 'Connect with local communities',
    'map.featured_locations': 'Featured Locations',
    'map.maputo_desc': 'Capital city and economic center of Mozambique',
    'map.inhambane_desc': 'Historic coastal province known for beaches and culture',
    'map.tete_desc': 'Mining province in the interior with rich traditions',
    'map.nampula_desc': 'Northern commercial hub with diverse communities',
    
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
    
    // Hero section
    'hero.title': 'Nossa Voz',
    'hero.mozambique': 'Moçambique',
    'hero.subtitle': 'Uma plataforma onde as comunidades rurais partilham as suas histórias, tradições e modo de vida',
    'hero.share_story': 'Partilhar Sua História',
    
    // Tabs
    'tabs.stories': 'Histórias da Comunidade',
    'tabs.languages': 'Nossas Línguas',
    'tabs.gallery': 'Galeria da Comunidade',
    
    // Stories section
    'stories.title': 'Histórias das Nossas Comunidades',
    'stories.subtitle': 'Histórias reais de pessoas reais partilhando a sua cultura, tradições, danças e vida quotidiana no Moçambique rural',
    
    // Call to action
    'cta.join_title': 'Junte-se à Nossa Comunidade',
    'cta.join_desc': 'Tem uma história para contar? Partilhe as suas tradições, cultura, danças e modo de vida com o mundo.',
    'cta.share_button': 'Partilhar Sua História',
    
    // Languages section
    'languages.title': 'Línguas de Moçambique',
    'languages.subtitle': 'Celebrando a diversidade linguística do nosso belo país',
    'languages.hero_alt': 'Línguas de Moçambique',
    'languages.hero_title': 'Moçambique Multilíngue',
    'languages.hero_subtitle': 'Bem-vindos em muitas línguas',
    'languages.portuguese': 'Português',
    'languages.official': 'Língua Oficial',
    'languages.portuguese_desc': 'A língua oficial de Moçambique, usada na educação, governo e comunicação formal.',
    'languages.makhuwa': 'Makhuwa',
    'languages.northern': 'Norte de Moçambique',
    'languages.makhuwa_desc': 'A língua bantu mais falada em Moçambique, principalmente nas províncias de Nampula e Cabo Delgado.',
    'languages.changana': 'Changana',
    'languages.southern': 'Sul de Moçambique',
    'languages.changana_desc': 'Falada principalmente nas províncias de Gaza e Maputo, parte da família linguística Tsonga.',
    'languages.sena': 'Sena',
    'languages.central': 'Centro de Moçambique',
    'languages.sena_desc': 'Falada principalmente na província de Sofala, ao longo do vale do rio Zambeze.',
    'languages.ndau': 'Ndau',
    'languages.manica_sofala': 'Manica e Sofala',
    'languages.ndau_desc': 'Falada nas regiões montanhosas de Manica e partes da província de Sofala.',
    'languages.nyanja': 'Nyanja',
    'languages.tete': 'Província de Tete',
    'languages.nyanja_desc': 'Comum na província de Tete, especialmente perto das fronteiras com o Malawi e Zâmbia.',
    'languages.preserve_title': 'Preservar as Nossas Línguas',
    'languages.preserve_desc': 'Ajude-nos a documentar e preservar o rico património linguístico de Moçambique partilhando histórias na sua língua nativa.',
    'languages.preserve_button': 'Partilhar na Sua Língua',
    
    // Gallery section
    'gallery.title': 'Galeria da Comunidade',
    'gallery.subtitle': 'Fotos partilhadas pelas nossas comunidades mostrando as suas tradições, cultura e celebrações',
    
    // Feed page
    'feed.title': 'Histórias da Nossa Comunidade',
    'feed.subtitle': 'Descubra a beleza e cultura de Moçambique',
    'feed.welcome': '✨ Bem-vindos à nossa comunidade! Estas histórias mostram a rica cultura e paisagens de Moçambique. Partilhe a sua própria história para se conectar com outros.',
    'feed.loading': 'A carregar histórias...',
    'feed.error': 'Não foi possível carregar as histórias',
    'feed.retry': 'Por favor, toque para tentar novamente.',
    'feed.try_again': 'Tentar Novamente',
    
    // Story actions
    'story.support': 'Apoiar',
    'story.supported': 'Apoiado ❤️',
    'story.connect': 'Conectar',
    'story.by_author': 'por {author}',
    'story.supported_toast': '❤️ História apoiada!',
    'story.supported_desc': 'Obrigado por apoiar esta história da comunidade.',
    'story.removed_toast': '✅ Apoio removido',
    'story.removed_desc': 'Removeu o seu apoio desta história.',
    'story.connect_toast': '🤝 Pedido enviado!',
    'story.connect_desc': 'O seu pedido de conexão foi enviado ao contador da história.',
    'story.share_title': 'Partilhar Sua História',
    'story.share_desc': 'Funcionalidade de partilha de histórias em breve! A sua voz é importante para nós.',
    'story.liked_title': 'História Gostou!',
    'story.liked_desc': 'Gostou de "{title}"',
    'story.connecting_title': 'A conectar...',
    'story.connecting_desc': 'A conectar com a comunidade {community}',
    
    // Map page
    'map.title': 'Mapa da Comunidade',
    'map.subtitle': 'Explore histórias e comunidades em Moçambique',
    'map.integration_title': 'Integração Google Maps',
    'map.integration_desc': 'Mapa interativo com localizações da comunidade em breve. Por agora, explore as nossas localizações em destaque abaixo.',
    'map.locations_title': 'Localizações',
    'map.featured_provinces': 'Províncias em destaque',
    'map.total_stories': 'Total de histórias',
    'map.active_communities': 'Comunidades ativas',
    'map.stories': 'histórias',
    'map.communities': 'comunidades',
    'map.coordinates': 'Coordenadas',
    'map.how_to_use': 'Como Usar',
    'map.instruction_1': 'Clique nos botões de localização para ver detalhes',
    'map.instruction_2': 'Integração de mapa interativo em breve',
    'map.instruction_3': 'As histórias serão plotadas por localização',
    'map.instruction_4': 'Conecte-se com comunidades locais',
    'map.featured_locations': 'Localizações em Destaque',
    'map.maputo_desc': 'Cidade capital e centro económico de Moçambique',
    'map.inhambane_desc': 'Província costeira histórica conhecida por praias e cultura',
    'map.tete_desc': 'Província mineira no interior com tradições ricas',
    'map.nampula_desc': 'Centro comercial do norte com comunidades diversas',
    
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
    
    'hero.title': 'Ilweto Yethu',
    'hero.mozambique': 'Mosambiki',
    'hero.subtitle': 'Nkhala yoamukela ekalamu za kumahali koothera mahiku awe, ntamaduni ni mavaha aya',
    'hero.share_story': 'Varelane Ikaya Yinu',
    
    'tabs.stories': 'Mahiku ya Ekalamu',
    'tabs.languages': 'Nilimi Zethu',
    'tabs.gallery': 'Galeria ya Ekalamu',
    
    'stories.title': 'Mahiku ya Ekalamu Zethu',
    'stories.subtitle': 'Mahiku ya kweli ya anthu ya kweli ovarelana ntamaduni zawe, mihiku ni mavaha ya kila mutxa wa Mosambiki wa kumahali',
    
    'cta.join_title': 'Winjireni Ekalamuni Yethu',
    'cta.join_desc': 'Muna ikaya ya koamba? Varelanani ntamaduni zinu, ntamaduni, mihiku ni mavaha ya kila mutxa ni anthu othene.',
    'cta.share_button': 'Varelane Ikaya Yinu',
    
    'languages.title': 'Nilimi za Mosambiki',
    'languages.subtitle': 'Okombela vuvaha vwa nilimi othene mwa nchi yethu ya saseka',
    'languages.hero_alt': 'Nilimi za Mosambiki',
    'languages.hero_title': 'Mosambiki wa Nilimi Nyinji',
    'languages.hero_subtitle': 'Mwakaribu ni nilimi nyinji',
    'languages.portuguese': 'Kireno',
    'languages.official': 'Rilwimi rya Serikali',
    'languages.portuguese_desc': 'Rilwimi rya serikali rya Mosambiki, ritirhisiwa masomero, serikali ni matiko ya xikhoma.',
    'languages.makhuwa': 'Makhuwa',
    'languages.northern': 'Nyamathafa ya Mosambiki',
    'languages.makhuwa_desc': 'Rilwimi rya Bantu rya saseka ra Mosambiki, ra saseka eka xikarhi xa Nampula ni Cabo Delgado.',
    'languages.changana': 'Changana',
    'languages.southern': 'Dzonga ya Mosambiki',
    'languages.changana_desc': 'Riambiwa saseka eka xikarhi xa Gaza ni Maputo, xi teka ka xiyenge xa nilimi za Tsonga.',
    'languages.sena': 'Sena',
    'languages.central': 'Xikarhi xa Mosambiki',
    'languages.sena_desc': 'Riambiwa saseka eka xikarhi xa Sofala, ehansi ka tiko ra ntselo wa Zambezi.',
    'languages.ndau': 'Ndau',
    'languages.manica_sofala': 'Manica ni Sofala',
    'languages.ndau_desc': 'Riambiwa eka matiko ya tintshava ta Manica ni swiphemu swa xikarhi xa Sofala.',
    'languages.nyanja': 'Nyanja',
    'languages.tete': 'Xikarhi xa Tete',
    'languages.nyanja_desc': 'Ra tala eka xikarhi xa Tete, swinene ehansi ka milawu ya Malawi ni Zambia.',
    'languages.preserve_title': 'Hi Hlayisa Nilimi Zethu',
    'languages.preserve_desc': 'Hi pfuneni hi ku tsala ni ku hlayisa rirhandzu ra nilimi ra Mosambiki hi ku avelana switori hi ririmi ra n\'wina.',
    'languages.preserve_button': 'Varelanani hi Ririmi Ra N\'wina',
    
    'gallery.title': 'Galeria ya Ekalamu',
    'gallery.subtitle': 'Swifaniso swa averiwa hi ekalamu za hina swi kombisa ntamaduni zawe, ntamaduni ni mimpingano',
    
    'feed.title': 'Mahiku ya Ekalamu Wethu',
    'feed.subtitle': 'Mwehe vuvaha ni ntamaduni ya Mosambiki',
    'feed.welcome': '✨ Mwakaribu ekalamuni yethu! Mahiku aya anawoneha ntamaduni ni mavaha ya Mosambiki. Varelane ikaya yinu ni allopwe.',
    'feed.loading': 'Olova mahiku...',
    'feed.error': 'Khaani olovisiwa mahiku',
    'feed.retry': 'Namalaka, kina ni wujeribe kina.',
    'feed.try_again': 'Jeribe Kina',
    
    'story.support': 'Wuninke',
    'story.supported': 'Waninkiwa ❤️',
    'story.connect': 'Wunganisihe',
    'story.by_author': 'wa {author}',
    'story.supported_toast': '❤️ Ikaya yaninkiwa!',
    'story.supported_desc': 'Asante ni wuninke ikaya ya ekalamu.',
    'story.removed_toast': '✅ Wuninke wususiwa',
    'story.removed_desc': 'Mwasusya wuninke winu.',
    'story.connect_toast': '🤝 Omapo watumiwa!',
    'story.connect_desc': 'Omapo winu watumiwa kwa mwene ikaya.',
    'story.share_title': 'Varelane Ikaya Yinu',
    'story.share_desc': 'Khidima ya ku avelana mahiku yiza enhlwini! Ilweto linu li saseka kwethu.',
    'story.liked_title': 'Ikaya Ithakhiwa!',
    'story.liked_desc': 'Mwathakha "{title}"',
    'story.connecting_title': 'Okopanyisiwa...',
    'story.connecting_desc': 'Okopanyisiwa ni ekalamu ya {community}',
    
    'map.title': 'Mapa ya Ekalamu',
    'map.subtitle': 'Vonani mahiku ni ekalamu ehansi ka Mosambiki',
    'map.integration_title': 'Kopanyiso ya Google Maps',
    'map.integration_desc': 'Mapa ya ku tirhana ni mahali ya ekalamu yiza enhlwini. Sweswi, vonani mahali ya hina lawa ya nandziha ehansi.',
    'map.locations_title': 'Mahali',
    'map.featured_provinces': 'Tiphuruvencia leti kombiwaka',
    'map.total_stories': 'Mahiku wohle',
    'map.active_communities': 'Ekalamu leti tirhaka',
    'map.stories': 'mahiku',
    'map.communities': 'ekalamu',
    'map.coordinates': 'Swikombiso',
    'map.how_to_use': 'Ku Tirhisa Njhani',
    'map.instruction_1': 'Kina swibotoni swa mahali kuti vona vuxokoxoko',
    'map.instruction_2': 'Kopanyiso ya mapa ya ku tirhana yiza enhlwini',
    'map.instruction_3': 'Mahiku yaza kombisiwa hi mahali',
    'map.instruction_4': 'Kopanyana ni ekalamu ya le kaya',
    'map.featured_locations': 'Mahali Lawa Ya Kombiwaka',
    'map.maputo_desc': 'Doroba ra nkulu ndi ndhawu ya iikonomiya ya Mosambiki',
    'map.inhambane_desc': 'Xifundzha xa erivyeni xa ndhawu lexi tivekaka hi makandlha ni ntamaduni',
    'map.tete_desc': 'Xifundzha xa migodi endzeni xa matiko ya ntamaduni ya rirhandzu',
    'map.nampula_desc': 'Ndhawu ya vuxavisi bya nyamathafa ya ekalamu ya ku hambana',
    
    'category.traditions': 'Ntamaduni',
    'category.crafts': 'Viteho',
    'category.music': 'Nyimbo',
    'category.agriculture': 'Ulimi',
    'category.celebrations': 'Mapampo',
    'category.traditional_dances': 'Ngoma za Ntamaduni',
    'category.elder_wisdom': 'Hekima ya Wakongwe',
    'category.traditional_clothes': 'Nguo za Ntamaduni',
    
    'auth.session_ended': 'Othimihe',
    'auth.session_ended_desc': 'Othimihe vavaha.',
    'auth.error': 'Ovolowe',
    'auth.logout_error': 'Othimihiwa khaani.',
    
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
    
    'hero.title': 'Mawu Athu',
    'hero.mozambique': 'Mozambique',
    'hero.subtitle': 'Nsanja yokulumbira anthu akumidzi kuti afotokoze nkhani zawo, miyambo ndi moyo wawo',
    'hero.share_story': 'Fotokozerani Nkhani Yanu',
    
    'tabs.stories': 'Nkhani za Anthu',
    'tabs.languages': 'Ziyankhulo Zathu',
    'tabs.gallery': 'Galeria ya Anthu',
    
    'stories.title': 'Nkhani za Anthu Athu',
    'stories.subtitle': 'Nkhani zenizeni za anthu enieni okufotokoza chikhalidwe chao, miyambo, zovina ndi moyo wa tsiku ndi tsiku ku Mozambique wakumidzi',
    
    'cta.join_title': 'Lowani ku Anthu Athu',
    'cta.join_desc': 'Kodi muli ndi nkhani yoti mufotokoze? Gawanani miyambo yanu, chikhalidwe, zovina ndi moyo wanu ndi dziko lonse.',
    'cta.share_button': 'Gawanani Nkhani Yanu',
    
    'languages.title': 'Ziyankhulo za Mozambique',
    'languages.subtitle': 'Kukondwerera kwa ziyankhulo kudzera m\'dziko lathu lokongola',
    'languages.hero_alt': 'Ziyankhulo za Mozambique',
    'languages.hero_title': 'Mozambique wa Ziyankhulo Zambiri',
    'languages.hero_subtitle': 'Kulandirani mu ziyankhulo zambiri',
    'languages.portuguese': 'Chipwitikizi',
    'languages.official': 'Chiyankhulo cha Boma',
    'languages.portuguese_desc': 'Chiyankhulo cha boma cha Mozambique, chogwiritsidwa ntchito pa sukulu, boma ndi kuyankhulana kwa anthu akulu.',
    'languages.makhuwa': 'Makhuwa',
    'languages.northern': 'Kumpoto kwa Mozambique',
    'languages.makhuwa_desc': 'Chiyankhulo cha Bantu chofala kwambiri ku Mozambique, makamaka ku zigawo za Nampula ndi Cabo Delgado.',
    'languages.changana': 'Changana',
    'languages.southern': 'Kumwera kwa Mozambique',
    'languages.changana_desc': 'Choyankhulidwa makamaka ku zigawo za Gaza ndi Maputo, chimagawo cha banja la ziyankhulo za Tsonga.',
    'languages.sena': 'Sena',
    'languages.central': 'Pakati pa Mozambique',
    'languages.sena_desc': 'Choyankhulidwa makamaka ku chigawo cha Sofala, m\'mphepete mwa chigwa cha mtsinje wa Zambezi.',
    'languages.ndau': 'Ndau',
    'languages.manica_sofala': 'Manica ndi Sofala',
    'languages.ndau_desc': 'Choyankhulidwa ku madera a mapiri a Manica ndi magawo ena a chigawo cha Sofala.',
    'languages.nyanja': 'Nyanja',
    'languages.tete': 'Chigawo cha Tete',
    'languages.nyanja_desc': 'Chofala ku chigawo cha Tete, makamaka pafupi ndi malire a Malawi ndi Zambia.',
    'languages.preserve_title': 'Tisungeni Ziyankhulo Zathu',
    'languages.preserve_desc': 'Mutithandizeni kulonga ndi kusunga cholowa chambirimbiri cha ziyankhulo za Mozambique pogawana nkhani mu chiyankhulo chanu chabadwa.',
    'languages.preserve_button': 'Gawanani mu Chiyankhulo Chanu',
    
    'gallery.title': 'Galeria ya Anthu',
    'gallery.subtitle': 'Zithunzi zogawidwa ndi anthu athu zosonyeza miyambo yawo, chikhalidwe ndi zikondwerero',
    
    'feed.title': 'Nkhani za Anthu Athu',
    'feed.subtitle': 'Onani kukongola ni chikhalidwe cha Mozambique',
    'feed.welcome': '✨ Takulandirani ku anthu athu! Nkhani izi zikusonyeza chikhalidwe ndi kukongola kwa Mozambique. Gawanani nkhani yanu kuti mugwirizane ndi anzanu.',
    'feed.loading': 'Tikuverenga nkhani...',
    'feed.error': 'Sitingathe kuverenga nkhani',
    'feed.retry': 'Chonde, dindani kuti muyeseni.',
    'feed.try_again': 'Yesaninso',
    
    'story.support': 'Thandizani',
    'story.supported': 'Wathandizidwa ❤️',
    'story.connect': 'Lumikizani',
    'story.by_author': 'ndi {author}',
    'story.supported_toast': '❤️ Nkhani yathandizidwa!',
    'story.supported_desc': 'Zikomo pothandiza nkhani ya anthu.',
    'story.removed_toast': '✅ Thandizo lachotsedwa',
    'story.removed_desc': 'Mwachotsa thandizo lanu.',
    'story.connect_toast': '🤝 Pempho latumizidwa!',
    'story.connect_desc': 'Pempho lanu latumizidwa kwa wokamba nkhani.',
    'story.share_title': 'Gawanani Nkhani Yanu',
    'story.share_desc': 'Dongosolo logawana nkhani likubwera posachedwa! Mawu anu ndofunikira kwa ife.',
    'story.liked_title': 'Nkhani Yakondedwa!',
    'story.liked_desc': 'Mwakonda "{title}"',
    'story.connecting_title': 'Tikulumikiza...',
    'story.connecting_desc': 'Tikulumikiza ndi anthu a {community}',
    
    'map.title': 'Mapu ya Anthu',
    'map.subtitle': 'Onani nkhani ndi anthu kudzera ku Mozambique',
    'map.integration_title': 'Kulumikizana ndi Google Maps',
    'map.integration_desc': 'Mapu ogwiritsana ntchito ndi malo a anthu akubwera posachedwa. Pakadali pano, onani malo athu apaderawotu.',
    'map.locations_title': 'Malo',
    'map.featured_provinces': 'Zigawo zoonetsedwa',
    'map.total_stories': 'Nkhani zonse',
    'map.active_communities': 'Anthu omwe akugwira ntchito',
    'map.stories': 'nkhani',
    'map.communities': 'anthu',
    'map.coordinates': 'Ma coordinates',
    'map.how_to_use': 'Momwe Mungagwiritsire Ntchito',
    'map.instruction_1': 'Dindani ma batani a malo kuti muwone zambiri',
    'map.instruction_2': 'Kulumikizana ndi mapu akubwera posachedwa',
    'map.instruction_3': 'Nkhani zidzayikidwa malinga ndi malo',
    'map.instruction_4': 'Lumikizanani ndi anthu apafupiafupi',
    'map.featured_locations': 'Malo Oonetsedwa',
    'map.maputo_desc': 'Mzinda waukulu ndi likulu la chuma cha Mozambique',
    'map.inhambane_desc': 'Chigawo cha m\'mphepete mwa nyanja chokhala kale chodziwika ndi nyanja ndi chikhalidwe',
    'map.tete_desc': 'Chigawo cha migodi mkati mwa dziko chokhala ndi miyambo yochuluka',
    'map.nampula_desc': 'Malo amalonda akumpoto okhala ndi anthu osiyanasiyana',
    
    'category.traditions': 'Miyambo',
    'category.crafts': 'Misanga',
    'category.music': 'Nyimbo',
    'category.agriculture': 'Ulimi',
    'category.celebrations': 'Zikondwerero',
    'category.traditional_dances': 'Zovina za Miyambo',
    'category.elder_wisdom': 'Nzeru za Akuluakulu',
    'category.traditional_clothes': 'Zovala za Miyambo',
    
    'auth.session_ended': 'Tamaliza',
    'auth.session_ended_desc': 'Tamaliza bwino.',
    'auth.error': 'Vuto',
    'auth.logout_error': 'Sitinathe kutuluka.',
    
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
    
    'hero.title': 'Rito Ra Hina',
    'hero.mozambique': 'Mozambique',
    'hero.subtitle': 'Xifundzha lexi vaaki va le mashangakani va avelana mintsheketo ya vona, mindhavuko ni vutomi bya vona',
    'hero.share_story': 'Avelanani Ntsheketo Wa N\'wina',
    
    'tabs.stories': 'Mintsheketo ya Vaaki',
    'tabs.languages': 'Tindzimi Ta Hina',
    'tabs.gallery': 'Galeria ya Vaaki',
    
    'stories.title': 'Mintsheketo ya Vaaki va Hina',
    'stories.subtitle': 'Mintsheketo ya ntiyiso ya vanhu va ntiyiso lava avelanaka mindhavuko ya vona, mindhavuko, swinevelo ni vutomi bya siku ni siku eka Mozambique wa le mashangakani',
    
    'cta.join_title': 'Nghenenani eka Vaaki va Hina',
    'cta.join_desc': 'Xana u na ntsheketo wo ku. Avelanani mindhavuko ya n\'wina, mindhavuko, swinevelo ni vutomi bya n\'wina ni misava hinkwayo.',
    'cta.share_button': 'Avelanani Ntsheketo Wa N\'wina',
    
    'languages.title': 'Tindzimi ta Mozambique',
    'languages.subtitle': 'Ku tlangelela ku hambana ka tindzimi eka rixaka ra hina ro saseka',
    'languages.hero_alt': 'Tindzimi ta Mozambique',
    'languages.hero_title': 'Mozambique wa Tindzimi to Tala',
    'languages.hero_subtitle': 'Muamukeli hi tindzimi to tala',
    'languages.portuguese': 'Xiputukezi',
    'languages.official': 'Ririmi ra Mfumo',
    'languages.portuguese_desc': 'Ririmi ra mfumo ra Mozambique, leri tirhisiwaka etikakhalayeni, mfumweni ni vulavurisani bya xintu.',
    'languages.makhuwa': 'Makhuwa',
    'languages.northern': 'Nyangamela wa Mozambique',
    'languages.makhuwa_desc': 'Ririmi ra Bantu leri vurisiwaka ngopfu eka Mozambique, ku tlhela eka tindzawu ta Nampula ni Cabo Delgado.',
    'languages.changana': 'Changana',
    'languages.southern': 'Dzonga wa Mozambique',
    'languages.changana_desc': 'Leri vurisiwaka ngopfu eka tindzawu ta Gaza ni Maputo, xi nga xiphemu xa ndyangu wa tindzimi ta Tsonga.',
    'languages.sena': 'Sena',
    'languages.central': 'Xikarhi xa Mozambique',
    'languages.sena_desc': 'Leri vurisiwaka ngopfu eka xifundzha xa Sofala, le ka xipanta xa rivandla ra Zambezi.',
    'languages.ndau': 'Ndau',
    'languages.manica_sofala': 'Manica ni Sofala',
    'languages.ndau_desc': 'Leri vurisiwaka eka switirhelo swa tintshava ta Manica ni swiphemu swa xifundzha xa Sofala.',
    'languages.nyanja': 'Nyanja',
    'languages.tete': 'Xifundzha xa Tete',
    'languages.nyanja_desc': 'Leri taleke eka xifundzha xa Tete, ngopfu-ngopfu ehansi ka milawu ya Malawi ni Zambia.',
    'languages.preserve_title': 'Hi Hlayisa Tindzimi Ta Hina',
    'languages.preserve_desc': 'Hi pfuneni hi ku tsala ni ku hlayisa rirhandzu ra tindzimi ra Mozambique hi ku avelana switori hi ririmi ra n\'wina.',
    'languages.preserve_button': 'Avelanani hi Ririmi Ra N\'wina',
    
    'gallery.title': 'Galeria ya Vaaki',
    'gallery.subtitle': 'Swifaniso swa averiwa hi vaaki va hina swi kombisa mindhavuko ya vona, mindhavuko ni mintlangu',
    
    'feed.title': 'Mintsheketo ya Vaaki va Hina',
    'feed.subtitle': 'Vonani ku saseka ni mindhavuko ya Mozambique',
    'feed.welcome': '✨ Ni amukela eka vaaki va hina! Mintsheketo leyi yi kombisa mindhavuko ni ku saseka ka Mozambique. Avelanani ntsheketo wa n\'wina ku hlanganisa na van\'wana.',
    'feed.loading': 'Hi karhi hi lava mintsheketo...',
    'feed.error': 'A hi swi kotangi ku lava mintsheketo',
    'feed.retry': 'Kombela, tinyiketa ku ringeta nakambe.',
    'feed.try_again': 'Ringeta Nakambe',
    
    'story.support': 'Seketela',
    'story.supported': 'Wu seketeriwile ❤️',
    'story.connect': 'Hlanganisa',
    'story.by_author': 'hi {author}',
    'story.supported_toast': '❤️ Ntsheketo wu seketeriwile!',
    'story.supported_desc': 'Inkomu hi ku seketela ntsheketo wa vaaki.',
    'story.removed_toast': '✅ Ku seketela ku susiwile',
    'story.removed_desc': 'U susile ku seketela ka wena.',
    'story.connect_toast': '🤝 Kombelo ri rhumeriwe!',
    'story.connect_desc': 'Kombelo ra wena ri rhumeriwe eka muxaxi wa ntsheketo.',
    'story.share_title': 'Avelanani Ntsheketo Wa N\'wina',
    'story.share_desc': 'Xiphiqo xo avelana mintsheketo xi ta enhlwini! Rito ra n\'wina ri boha eka hina.',
    'story.liked_title': 'Ntsheketo Wu Rhandze!',
    'story.liked_desc': 'U rhandze "{title}"',
    'story.connecting_title': 'Hi karhi hi hlanganisa...',
    'story.connecting_desc': 'Hi karhi hi hlanganisa ni vaaki va {community}',
    
    'map.title': 'Mapa ya Vaaki',
    'map.subtitle': 'Vonani mintsheketo ni vaaki ehansi ka Mozambique',
    'map.integration_title': 'Ku hlanganisa ni Google Maps',
    'map.integration_desc': 'Mapa ya ku tirhana ni tindhawu ta vaaki yi ta enhlwini. Sweswi, vonani tindhawu ta hina leti kombiwaka ehansi.',
    'map.locations_title': 'Tindhawu',
    'map.featured_provinces': 'Swifundzha leswi kombiwaka',
    'map.total_stories': 'Mintsheketo hinkwayo',
    'map.active_communities': 'Vaaki lava tirhaka',
    'map.stories': 'mintsheketo',
    'map.communities': 'vaaki',
    'map.coordinates': 'Swikombiso',
    'map.how_to_use': 'Ku Tirhisa Njhani',
    'map.instruction_1': 'Kina swibotoni swa tindhawu kuti vona swilo swo tala',
    'map.instruction_2': 'Ku hlanganisa ni mapa ya ku tirhana ku ta enhlwini',
    'map.instruction_3': 'Mintsheketo yi ta kombisiwa hi ku ya hi tindhawu',
    'map.instruction_4': 'Hlanganisenani ni vaaki va le kaya',
    'map.featured_locations': 'Tindhawu Leti Kombiwaka',
    'map.maputo_desc': 'Doroba ra nkulu ndi ndhawu ya iikonomiya ya Mozambique',
    'map.inhambane_desc': 'Xifundzha xa erivyeni xa ndhawu lexi tivekaka hi makandlha ni mindhavuko',
    'map.tete_desc': 'Xifundzha xa migodi endzeni xa mindhavuko ya rirhandzu',
    'map.nampula_desc': 'Ndhawu ya vuxavisi bya nyamathafa ya vaaki va ku hambana',
    
    'category.traditions': 'Mindhavuko',
    'category.crafts': 'Swilo swo endla',
    'category.music': 'Marito',
    'category.agriculture': 'Vurimi',
    'category.celebrations': 'Mintlangu',
    'category.traditional_dances': 'Swinevelo swa Mindhavuko',
    'category.elder_wisdom': 'Vutivi bya Vakulu',
    'category.traditional_clothes': 'Mintshaho ya Mindhavuko',
    
    'auth.session_ended': 'Ku hetile',
    'auth.session_ended_desc': 'Ku hetile kahle.',
    'auth.error': 'Xiphiqo',
    'auth.logout_error': 'A hi swi kotangi ku humela.',
    
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

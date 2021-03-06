//list of all the countries, which are the names of the images for reference
countries = ['algeria','angola','ascension-islands','benin','botswana',
              'burkina-faso','burundi','cameroon','cape-verde','central-african-republic',
              'chad','comoros','democratic-republic-of-congo','djibouti','egypt',
              'equatorial-guinea','eritrea','ethiopia','gabon','ghana','guinea',
              'guinea-bissau','ivory-coast','kenya','lesotho','liberia','libya',
              'madagascar','malawi','mali','mauritania','mauritius','mayotte',
              'morocco','mozambique','namibia','niger','nigeria','republic-of-congo',
              'réunion','rwanda','saint-helena','sao-tome-and-principe','senegal',
              'seychelles','sierra-leone','somalia','south-africa','south-sudan',
              'sudan','swaziland','tanzania','the-gambia','togo','tristan-da-cunha',
              'tunisia','uganda','western-sahara','zambia','zimbabwe',

              'afghanistan','armenia','azerbaijan','bahrain','bangladesh',
              'bhutan','british-indian-ocean-territory','brunei','cambodia',
              'china','christmas-island','cocos-islands','east-timor','georgia',
              'india','indonesia','iran','iraq','israel','japan','jordan',
              'kazakhstan','kuwait','kyrgyzstan','laos','lebanon','malaysia',
              'maldives','mongolia','myanmar','nepal','north-korea','oman','pakistan',
              'palestine','philippines','qatar','russia','saudi-arabia','singapore',
              'south-korea','sri-lanka','syria','tajikistan','thailand','turkey',
              'turkmenistan','united-arab-emirates','uzbekistan','vietnam','yemen',

              'aland','albania','andorra','austria','belarus','belgium',
              'bosnia-and-herzegovina','bulgaria','croatia','cyprus',
              'czech-republic','denmark','estonia','faroe-islands','finland',
              'france','germany','gibraltar','greece','guernsey','hungary',
              'iceland','ireland','isle-of-mann','italy','jersey','kosovo','latvia','liechtenstein',
              'lithuania','luxembourg','macedonia','malta','moldova','monaco',
              'montenegro','netherlands','norway','poland','portugal','romania',
              'san-marino','serbia','slovakia','slovenia','spain','sweden',
              'switzerland','ukraine','united-kingdom','vatican-city',

              'anguilla','antigua-and-barbuda','aruba','bahamas',
              'barbados','belize','bermuda','bonaire','british-virgin-islands',
              'canada','cayman-islands','costa-rica','cuba','curacao','dominica',
              'dominican-republic','el-salvador','grenada','guatemala','haiti',
              'honduras','jamaica','mexico','montserrat','nicaragua','panama',
              'puerto-rico','saba','saint-kitts-and-nevis','saint-lucia',
              'saint-vincent-and-the-grenadines','sint-eustatius','sint-maarten',
              'trinidad-and-tobago','turks-and-caicos-islands','united-states',
              'united-states-virgin-islands',

              'argentina','bolivia','brazil','chile','colombia','ecuador',
              'falkland-islands','guyana','paraguay','peru',
              'south-georgia-and-the-south-sandwich-islands','suriname','uruguay',
              'venezuela',

              'american-samoa','australia','austral-islands','chatham-islands',
              'chuuk','cook-islands','easter-island','federated-states-of-micronesia',
              'fiji','french-polynesia','gambier-islands','guam','hawaii','kiribati',
              'kosrae','marquesas-islands','marshall-islands','nauru','new-caledonia',
              'new-zealand','niue','norfolk-island','northern-mariana-islands',
              'palau','papua-new-guinea','pitcairn-islands','pohnpei','samoa',
              'solomon-islands','tokelau','tonga','tuamotu-archipelago','tuvalu',
              'vanuatu','wallis-and-futuna-islands','yap'];

//these arrays below are specifically for versions of the game based on a single continent
//countries only from africa
countriesAfrica = ['algeria','angola','ascension-islands','benin','botswana',
              'burkina-faso','burundi','cameroon','cape-verde','central-african-republic',
              'chad','comoros','democratic-republic-of-congo','djibouti','egypt',
              'equatorial-guinea','eritrea','ethiopia','gabon','ghana','guinea',
              'guinea-bissau','ivory-coast','kenya','lesotho','liberia','libya',
              'madagascar','malawi','mali','mauritania','mauritius','mayotte',
              'morocco','mozambique','namibia','niger','nigeria','republic-of-congo',
              'réunion','rwanda','saint-helena','sao-tome-and-principe','senegal',
              'seychelles','sierra-leone','somalia','south-africa','south-sudan',
              'sudan','swaziland','tanzania','the-gambia','togo','tristan-da-cunha',
              'tunisia','uganda','western-sahara','zambia','zimbabwe'];

//countries only from asia
countriesAsia = ['afghanistan','armenia','azerbaijan','bahrain','bangladesh',
              'bhutan','british-indian-ocean-territory','brunei','cambodia',
              'china','christmas-island','cocos-islands','east-timor','georgia',
              'india','indonesia','iran','iraq','israel','japan','jordan',
              'kazakhstan','kuwait','kyrgyzstan','laos','lebanon','malaysia',
              'maldives','mongolia','myanmar','nepal','north-korea','oman','pakistan',
              'palestine','philippines','qatar','russia','saudi-arabia','singapore',
              'south-korea','sri-lanka','syria','tajikistan','thailand','turkey',
              'turkmenistan','united-arab-emirates','uzbekistan','vietnam','yemen'];

//countries only from europe
countriesEurope = ['aland','albania','andorra','austria','belarus','belgium',
              'bosnia-and-herzegovina','bulgaria','croatia','cyprus',
              'czech-republic','denmark','estonia','faroe-islands','finland',
              'france','germany','gibraltar','greece','guernsey','hungary',
              'iceland','ireland','isle-of-mann','italy','jersey','kosovo','latvia','liechtenstein',
              'lithuania','luxembourg','macedonia','malta','moldova','monaco',
              'montenegro','netherlands','norway','poland','portugal','romania',
              'san-marino','serbia','slovakia','slovenia','spain','sweden',
              'switzerland','ukraine','united-kingdom','vatican-city'];

//countries only from north america
countriesNorthAmerica = ['anguilla','antigua-and-barbuda','aruba','bahamas',
              'barbados','belize','bermuda','british-virgin-islands',
              'canada','cayman-islands','costa-rica','cuba','dominica',
              'dominican-republic','el-salvador','grenada','guatemala','haiti',
              'honduras','jamaica','mexico','montserrat','nicaragua','panama',
              'puerto-rico','saba','saint-kitts-and-nevis','saint-lucia',
              'saint-vincent-and-the-grenadines','sint-eustatius','sint-maarten',
              'trinidad-and-tobago','turks-and-caicos-islands','united-states',
              'united-states-virgin-islands'];

//countries only from south america
countriesSouthAmerica = ['argentina','bolivia','bonaire','brazil','chile','colombia',
              'curacao','ecuador','falkland-islands','guyana','paraguay','peru',
              'south-georgia-and-the-south-sandwich-islands','suriname','uruguay',
              'venezuela'];

//countries only from oceania
countriesOceania = ['american-samoa','australia','austral-islands','chatham-islands',
              'chuuk','cook-islands','easter-island','federated-states-of-micronesia',
              'fiji','french-polynesia','gambier-islands','guam','hawaii','kiribati',
              'kosrae','marquesas-islands','marshall-islands','nauru','new-caledonia',
              'new-zealand','niue','norfolk-island','northern-mariana-islands',
              'palau','papua-new-guinea','pitcairn-islands','pohnpei','samoa',
              'solomon-islands','tokelau','tonga','tuamotu-archipelago','tuvalu',
              'vanuatu','wallis-and-futuna-islands','yap'];

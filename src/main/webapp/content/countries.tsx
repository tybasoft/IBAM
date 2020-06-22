const countries = [
  { name: 'Afghanistan', code: 'AF', lng: 'fr' },
  { name: 'Afghanistan', code: 'AF', lng: 'en' },
  { name: 'افغانستان', code: 'AF', lng: 'ar-ly' },
  { name: 'Afganistán', code: 'AF', lng: 'es' },

  { name: 'Afrique du Sud', code: 'ZA', lng: 'fr' },
  { name: 'South Africa', code: 'ZA', lng: 'en' },
  { name: 'جنوب أفريقيا', code: 'ZA', lng: 'ar-ly' },
  { name: 'Sudáfrica', code: 'ZA', lng: 'es' },

  { name: 'Albanie', code: 'AL', lng: 'fr' },
  { name: 'Albania', code: 'AL', lng: 'en' },
  { name: 'ألبانيا', code: 'AL', lng: 'ar-ly' },
  { name: 'Albania', code: 'AL', lng: 'es' },

  { name: 'Algérie', code: 'DZ', lng: 'fr' },
  { name: 'Algeria', code: 'DZ', lng: 'en' },
  { name: 'الجزائر', code: 'DZ', lng: 'ar-ly' },
  { name: 'Argelia', code: 'DZ', lng: 'es' },

  { name: 'Allemagne', code: 'DE', lng: 'fr' },
  { name: 'Germany', code: 'DE', lng: 'en' },
  { name: 'ألمانيا', code: 'DE', lng: 'ar-ly' },
  { name: 'Alemania', code: 'DE', lng: 'es' },

  { name: 'Angola', code: 'AO', lng: 'fr' },
  { name: 'Angola', code: 'AO', lng: 'en' },
  { name: 'أنغولا', code: 'AO', lng: 'ar-ly' },
  { name: '	Angola', code: 'AO', lng: 'es' },

  { name: 'Arabie saoudite', code: 'SA', lng: 'fr' },
  { name: 'Saudi Arabia', code: 'SA', lng: 'en' },
  { name: 'المملكة العربية السعودية', code: 'SA', lng: 'ar-ly' },
  { name: '	Arabia Saudita', code: 'SA', lng: 'es' },

  { name: 'Argentine', code: 'AR', lng: 'fr' },
  { name: 'Argentina', code: 'AR', lng: 'en' },
  { name: 'الأرجنتين', code: 'AR', lng: 'ar-ly' },
  { name: 'Argentina', code: 'AR', lng: 'es' },

  { name: 'Arménie', code: 'AM', lng: 'fr' },
  { name: 'Armenia', code: 'AM', lng: 'en' },
  { name: 'أرمينيا', code: 'AM', lng: 'ar-ly' },
  { name: 'Armenia', code: 'AM', lng: 'es' },

  { name: 'Australie', code: 'AU', lng: 'fr' },
  { name: 'Australia', code: 'AU', lng: 'en' },
  { name: 'أستراليا', code: 'AU', lng: 'ar-ly' },
  { name: 'Australia', code: 'AU', lng: 'es' },

  { name: 'Autriche', code: 'AT', lng: 'fr' },
  { name: 'Austria', code: 'AT', lng: 'en' },
  { name: 'النمسا', code: 'AT', lng: 'ar-ly' },
  { name: 'Austria', code: 'AT', lng: 'es' },

  { name: 'Azerbaïdjan', code: 'AZ', lng: 'fr' },
  { name: 'Azerbaijan', code: 'AZ', lng: 'en' },
  { name: 'أذربيجان', code: 'AZ', lng: 'ar-ly' },
  { name: 'Azerbaiyán', code: 'AZ', lng: 'es' },

  { name: 'Bahreïn', code: 'BH', lng: 'fr' },
  { name: 'Bahrain', code: 'BH', lng: 'en' },
  { name: 'البحرين', code: 'BH', lng: 'ar-ly' },
  { name: 'Baréin', code: 'BH', lng: 'es' },

  { name: 'Bangladesh', code: 'BD', lng: 'fr' },
  { name: 'Bangladesh', code: 'BD', lng: 'en' },
  { name: 'بنغلاديش', code: 'BD', lng: 'ar-ly' },
  { name: 'Bangladés', code: 'BD', lng: 'es' },

  { name: 'Bélarus', code: 'BY', lng: 'fr' },
  { name: 'Belarus', code: 'BY', lng: 'en' },
  { name: 'روسيا البيضاء', code: 'BY', lng: 'ar-ly' },
  { name: 'Bielorrusia', code: 'BY', lng: 'es' },

  { name: 'Belgique', code: 'BE', lng: 'fr' },
  { name: 'Belgium', code: 'BE', lng: 'en' },
  { name: 'بلجيكا', code: 'BE', lng: 'ar-ly' },
  { name: 'Bélgica', code: 'BE', lng: 'es' },

  { name: 'Bénin', code: 'BJ', lng: 'fr' },
  { name: 'Benin', code: 'BJ', lng: 'en' },
  { name: 'بنين', code: 'BJ', lng: 'ar-ly' },
  { name: 'Benin', code: 'BJ', lng: 'es' },

  { name: 'Bolivie', code: 'BO', lng: 'fr' },
  { name: 'Bolivia', code: 'BO', lng: 'en' },
  { name: 'بوليفيا', code: 'BO', lng: 'ar-ly' },
  { name: 'Bolivia', code: 'BO', lng: 'es' },

  { name: 'Bosnie-Herzégovine', code: 'BA', lng: 'fr' },
  { name: 'Bosnia and Herzegovina', code: 'BA', lng: 'en' },
  { name: 'البوسنة و الهرسك', code: 'BA', lng: 'ar-ly' },
  { name: 'Bosnia-Herzegovina', code: 'BA', lng: 'es' },

  { name: 'Botswana', code: 'BW', lng: 'fr' },
  { name: 'Botswana', code: 'BW', lng: 'en' },
  { name: 'بوتسوانا', code: 'BW', lng: 'ar-ly' },
  { name: 'Botsuana', code: 'BW', lng: 'es' },

  { name: 'Brésil', code: 'BR', lng: 'fr' },
  { name: 'Brazil', code: 'BR', lng: 'en' },
  { name: 'البرازيل', code: 'BR', lng: 'ar-ly' },
  { name: 'Brasil', code: 'BR', lng: 'es' },

  { name: 'Bulgarie', code: 'BG', lng: 'fr' },
  { name: 'Bulgaria', code: 'BG', lng: 'en' },
  { name: 'بلغاريا', code: 'BG', lng: 'ar-ly' },
  { name: 'Bulgaria', code: 'BG', lng: 'es' },

  { name: 'Burkina Faso', code: 'BF', lng: 'fr' },
  { name: 'Burkina Faso', code: 'BF', lng: 'en' },
  { name: 'بوركينا فاسو', code: 'BF', lng: 'ar-ly' },
  { name: 'Burkina Faso', code: 'BF', lng: 'es' },

  { name: 'Burundi', code: 'BI', lng: 'fr' },
  { name: 'Burundi', code: 'BI', lng: 'en' },
  { name: 'بوروندي', code: 'BI', lng: 'ar-ly' },
  { name: 'Burundi', code: 'BI', lng: 'es' },

  { name: 'Cambodge', code: 'KH', lng: 'fr' },
  { name: 'Cambodia', code: 'KH', lng: 'en' },
  { name: 'كمبوديا', code: 'KH', lng: 'ar-ly' },
  { name: 'Camboya', code: 'KH', lng: 'es' },

  { name: 'Cameroun', code: 'CM', lng: 'fr' },
  { name: 'Cameroon', code: 'CM', lng: 'en' },
  { name: 'كاميرون', code: 'CM', lng: 'ar-ly' },
  { name: 'Camerún', code: 'CM', lng: 'es' },

  { name: 'Canada', code: 'CA', lng: 'fr' },
  { name: 'Canada', code: 'CA', lng: 'en' },
  { name: 'كندا', code: 'CA', lng: 'ar-ly' },
  { name: 'Canadá', code: 'CA', lng: 'es' },

  { name: 'Cap-Vert', code: 'CV', lng: 'fr' },
  { name: 'Cape Verde', code: 'CV', lng: 'en' },
  { name: 'الرأس الأخضر', code: 'CV', lng: 'ar-ly' },
  { name: 'Cabo Verde', code: 'CV', lng: 'es' },

  { name: 'Chili', code: 'CL', lng: 'fr' },
  { name: 'Chile', code: 'CL', lng: 'en' },
  { name: 'تشيلي', code: 'CL', lng: 'ar-ly' },
  { name: 'Chile', code: 'CL', lng: 'es' },

  { name: 'Chine', code: 'CN', lng: 'fr' },
  { name: 'China', code: 'CN', lng: 'en' },
  { name: 'جمهورية الصين الشعبية', code: 'CN', lng: 'ar-ly' },
  { name: 'China', code: 'CN', lng: 'es' },

  { name: 'Chypre', code: 'CY', lng: 'fr' },
  { name: 'Cyprus', code: 'CY', lng: 'en' },
  { name: 'قبرص', code: 'CY', lng: 'ar-ly' },
  { name: 'Chipre', code: 'CY', lng: 'es' },

  { name: 'Colombie', code: 'CO', lng: 'fr' },
  { name: 'Colombia', code: 'CO', lng: 'en' },
  { name: 'كولومبيا', code: 'CO', lng: 'ar-ly' },
  { name: 'Colombia', code: 'CO', lng: 'es' },

  { name: 'Congo-Brazzaville', code: 'CG', lng: 'fr' },
  { name: 'Republic of the Congo', code: 'CG', lng: 'en' },
  { name: 'جمهورية الكونغو', code: 'CG', lng: 'ar-ly' },
  { name: 'República del Congo', code: 'CG', lng: 'es' },

  { name: 'Corée du Nord', code: 'KP', lng: 'fr' },
  { name: 'North Korea', code: 'KP', lng: 'en' },
  { name: 'كوريا الشمالية', code: 'KP', lng: 'ar-ly' },
  { name: 'Corea del Norte', code: 'KP', lng: 'es' },

  { name: 'Corée du Sud', code: 'KR', lng: 'fr' },
  { name: 'South Korea', code: 'KR', lng: 'en' },
  { name: 'كوريا الجنوبية', code: 'KR', lng: 'ar-ly' },
  { name: 'Corea del Sur', code: 'KR', lng: 'es' },

  { name: 'Costa Rica', code: 'CR', lng: 'fr' },
  { name: 'Costa Rica', code: 'CR', lng: 'en' },
  { name: 'كوستاريكا', code: 'CR', lng: 'ar-ly' },
  { name: 'Costa Rica', code: 'CR', lng: 'es' },

  { name: 'Côte d’Ivoire', code: 'CI', lng: 'fr' },
  { name: 'Cote d’Ivoire', code: 'CI', lng: 'en' },
  { name: 'ساحل العاج', code: 'CI', lng: 'ar-ly' },
  { name: 'Costa de Marfil', code: 'CI', lng: 'es' },

  { name: 'Croatie', code: 'HR', lng: 'fr' },
  { name: 'Croatia', code: 'HR', lng: 'en' },
  { name: 'كرواتيا', code: 'HR', lng: 'ar-ly' },
  { name: 'Croacia', code: 'HR', lng: 'es' },

  { name: 'Cuba', code: 'CU', lng: 'fr' },
  { name: 'Cuba', code: 'CU', lng: 'en' },
  { name: 'كوبا', code: 'CU', lng: 'ar-ly' },
  { name: 'Cuba', code: 'CU', lng: 'es' },

  { name: 'Danemark', code: 'DK', lng: 'fr' },
  { name: 'Denmark', code: 'DK', lng: 'en' },
  { name: 'الدانمارك', code: 'DK', lng: 'ar-ly' },
  { name: 'Dinamarca', code: 'DK', lng: 'es' },

  { name: 'Djibouti', code: 'DJ', lng: 'fr' },
  { name: 'Djibouti', code: 'DJ', lng: 'en' },
  { name: 'جيبوتي', code: 'DJ', lng: 'ar-ly' },
  { name: 'Yibuti', code: 'DJ', lng: 'es' },

  { name: 'Egypte', code: 'EG', lng: 'fr' },
  { name: 'Egypt', code: 'EG', lng: 'en' },
  { name: 'مصر', code: 'EG', lng: 'ar-ly' },
  { name: 'Egipto', code: 'EG', lng: 'es' },

  { name: 'El Salvador', code: 'SV', lng: 'fr' },
  { name: 'El Salvador', code: 'SV', lng: 'en' },
  { name: 'السلفادور', code: 'SV', lng: 'ar-ly' },
  { name: 'El Salvador', code: 'SV', lng: 'es' },

  { name: 'Emirats arabes unis', code: 'AE', lng: 'fr' },
  { name: 'United Arab Emirates', code: 'AE', lng: 'en' },
  { name: 'الإمارات العربية المتحدة', code: 'AE', lng: 'ar-ly' },
  { name: 'Emiratos Árabes Unidos', code: 'AE', lng: 'es' },

  { name: 'Equateur', code: 'EC', lng: 'fr' },
  { name: 'Ecuador', code: 'EC', lng: 'en' },
  { name: 'إكوادور', code: 'EC', lng: 'ar-ly' },
  { name: 'Ecuador', code: 'EC', lng: 'es' },

  { name: 'Espagne', code: 'ES', lng: 'fr' },
  { name: 'Spain', code: 'ES', lng: 'en' },
  { name: 'إسبانيا', code: 'ES', lng: 'ar-ly' },
  { name: 'España', code: 'ES', lng: 'es' },

  { name: 'Estonie', code: 'EE', lng: 'fr' },
  { name: 'Estonia', code: 'EE', lng: 'en' },
  { name: 'استونيا', code: 'EE', lng: 'ar-ly' },
  { name: 'Estonia', code: 'EE', lng: 'es' },

  { name: 'Etats-Unis', code: 'US', lng: 'fr' },
  { name: 'United States of America', code: 'US', lng: 'en' },
  { name: 'الولايات المتحدة', code: 'US', lng: 'ar-ly' },
  { name: 'Estados Unidos', code: 'US', lng: 'es' },

  { name: 'Ethiopie', code: 'ET', lng: 'fr' },
  { name: 'Ethiopia', code: 'ET', lng: 'en' },
  { name: 'أثيوبيا', code: 'ET', lng: 'ar-ly' },
  { name: 'Etiopía', code: 'ET', lng: 'es' },

  { name: 'Finlande', code: 'FI', lng: 'fr' },
  { name: 'Finland', code: 'FI', lng: 'en' },
  { name: 'فنلندا', code: 'FI', lng: 'ar-ly' },
  { name: 'Finlandia', code: 'FI', lng: 'es' },

  { name: 'France', code: 'FR', lng: 'fr' },
  { name: 'France', code: 'FR', lng: 'en' },
  { name: 'فرنسا', code: 'FR', lng: 'ar-ly' },
  { name: 'Francia', code: 'FR', lng: 'es' },

  { name: 'Gabon', code: 'GA', lng: 'fr' },
  { name: 'Gabon', code: 'GA', lng: 'en' },
  { name: 'الغابون', code: 'GA', lng: 'ar-ly' },
  { name: 'Gabón', code: 'GA', lng: 'es' },

  { name: 'Gambie', code: 'GM', lng: 'fr' },
  { name: 'Gambia', code: 'GM', lng: 'en' },
  { name: 'غامبيا', code: 'GM', lng: 'ar-ly' },
  { name: 'Gambia', code: 'GM', lng: 'es' },

  { name: 'Ghana', code: 'GH', lng: 'fr' },
  { name: 'Ghana', code: 'GH', lng: 'en' },
  { name: 'غانا', code: 'GH', lng: 'ar-ly' },
  { name: 'Ghana', code: 'GH', lng: 'es' },

  { name: 'Grèce', code: 'GR', lng: 'fr' },
  { name: 'Greece', code: 'GR', lng: 'en' },
  { name: 'اليونان', code: 'GR', lng: 'ar-ly' },
  { name: 'Grecia', code: 'GR', lng: 'es' },

  { name: 'Guinée', code: 'GN', lng: 'fr' },
  { name: 'Guinea', code: 'GN', lng: 'en' },
  { name: 'غينيا', code: 'GN', lng: 'ar-ly' },
  { name: 'Guinea', code: 'GN', lng: 'es' },

  { name: 'Guinée équatoriale', code: 'GQ', lng: 'fr' },
  { name: 'Equatorial Guinea', code: 'GQ', lng: 'en' },
  { name: 'غينيا الاستوائية', code: 'GQ', lng: 'ar-ly' },
  { name: 'Guinea Ecuatorial', code: 'GQ', lng: 'es' },

  { name: 'Guinée-Bissau', code: 'GW', lng: 'fr' },
  { name: 'Guinea-Bissau', code: 'GW', lng: 'en' },
  { name: 'غينيا-بيساو', code: 'GW', lng: 'ar-ly' },
  { name: 'Guinea-Bisáu', code: 'GW', lng: 'es' },

  { name: 'Honduras', code: 'HN', lng: 'fr' },
  { name: 'Honduras', code: 'HN', lng: 'en' },
  { name: 'هندوراس', code: 'HN', lng: 'ar-ly' },
  { name: 'Honduras', code: 'HN', lng: 'es' },

  { name: 'Hong Kong', code: 'HK', lng: 'fr' },
  { name: 'Hong Kong', code: 'HK', lng: 'en' },
  { name: 'هونغ كونغ', code: 'HK', lng: 'ar-ly' },
  { name: 'Hong Kong', code: 'HK', lng: 'es' },

  { name: 'Hongrie', code: 'HU', lng: 'fr' },
  { name: 'Hungary', code: 'HU', lng: 'en' },
  { name: 'المجر', code: 'HU', lng: 'ar-ly' },
  { name: 'Hungría', code: 'HU', lng: 'es' },

  { name: 'Inde', code: 'IN', lng: 'fr' },
  { name: 'India', code: 'IN', lng: 'en' },
  { name: 'الهند', code: 'IN', lng: 'ar-ly' },
  { name: 'India', code: 'IN', lng: 'es' },

  { name: 'Indonésie', code: 'ID', lng: 'fr' },
  { name: 'Indonesia', code: 'ID', lng: 'en' },
  { name: 'أندونيسيا', code: 'ID', lng: 'ar-ly' },
  { name: 'Indonesia', code: 'ID', lng: 'es' },

  { name: 'Irak', code: 'IQ', lng: 'fr' },
  { name: 'Iraq', code: 'IQ', lng: 'en' },
  { name: 'العراق', code: 'IQ', lng: 'ar-ly' },
  { name: 'Irak', code: 'IQ', lng: 'es' },

  { name: 'Iran', code: 'IR', lng: 'fr' },
  { name: 'Iran', code: 'IR', lng: 'en' },
  { name: 'إيران', code: 'IR', lng: 'ar-ly' },
  { name: 'Irán', code: 'IR', lng: 'es' },

  { name: 'Irlande', code: 'IE', lng: 'fr' },
  { name: 'Ireland', code: 'IE', lng: 'en' },
  { name: 'جمهورية أيرلندا', code: 'IE', lng: 'ar-ly' },
  { name: 'Irlanda', code: 'IE', lng: 'es' },

  { name: 'Islande', code: 'IS', lng: 'fr' },
  { name: 'Iceland', code: 'IS', lng: 'en' },
  { name: 'آيسلندا', code: 'IS', lng: 'ar-ly' },
  { name: 'Islandia', code: 'IS', lng: 'es' },

  { name: 'Italie', code: 'IT', lng: 'fr' },
  { name: 'Italy', code: 'IT', lng: 'en' },
  { name: 'إيطاليا', code: 'IT', lng: 'ar-ly' },
  { name: 'Italia', code: 'IT', lng: 'es' },

  { name: 'Jamaïque', code: 'JM', lng: 'fr' },
  { name: 'Jamaica', code: 'JM', lng: 'en' },
  { name: 'جمايكا', code: 'JM', lng: 'ar-ly' },
  { name: 'Jamaica', code: 'JM', lng: 'es' },

  { name: 'Japon', code: 'JP', lng: 'fr' },
  { name: 'Japan', code: 'JP', lng: 'en' },
  { name: 'اليابان', code: 'JP', lng: 'ar-ly' },
  { name: 'Japón', code: 'JP', lng: 'es' },

  { name: 'Jordanie', code: 'JO', lng: 'fr' },
  { name: 'Jordan', code: 'JO', lng: 'en' },
  { name: 'الأردن', code: 'JO', lng: 'ar-ly' },
  { name: 'Jordania', code: 'JO', lng: 'es' },

  { name: 'Kazakhstan', code: 'KZ', lng: 'fr' },
  { name: 'Kazakhstan', code: 'KZ', lng: 'en' },
  { name: 'كازاخستان', code: 'KZ', lng: 'ar-ly' },
  { name: 'Kazajistán', code: 'KZ', lng: 'es' },

  { name: 'Kenya', code: 'KE', lng: 'fr' },
  { name: 'Kenya', code: 'KE', lng: 'en' },
  { name: 'كينيا', code: 'KE', lng: 'ar-ly' },
  { name: 'Kenia', code: 'KE', lng: 'es' },

  { name: 'Koweït', code: 'KW', lng: 'fr' },
  { name: 'Kuwait', code: 'KW', lng: 'en' },
  { name: 'الكويت', code: 'KW', lng: 'ar-ly' },
  { name: 'Kuwait', code: 'KW', lng: 'es' },

  { name: 'Lesotho', code: 'LS', lng: 'fr' },
  { name: 'Lesotho', code: 'LS', lng: 'en' },
  { name: 'ليسوتو', code: 'LS', lng: 'ar-ly' },
  { name: 'Lesoto', code: 'LS', lng: 'es' },

  { name: 'Lettonie', code: 'LV', lng: 'fr' },
  { name: 'Latvia', code: 'LV', lng: 'en' },
  { name: 'لاتفيا', code: 'LV', lng: 'ar-ly' },
  { name: 'Letonia', code: 'LV', lng: 'es' },

  { name: 'Liban', code: 'LB', lng: 'fr' },
  { name: 'Lebanon', code: 'LB', lng: 'en' },
  { name: 'لبنان', code: 'LB', lng: 'ar-ly' },
  { name: 'Líbano', code: 'LB', lng: 'es' },

  { name: 'Libéria', code: 'LR', lng: 'fr' },
  { name: 'Liberia', code: 'LR', lng: 'en' },
  { name: 'ليبيريا', code: 'LR', lng: 'ar-ly' },
  { name: 'Liberia', code: 'LR', lng: 'es' },

  { name: 'Libye', code: 'LY', lng: 'fr' },
  { name: 'Libya', code: 'LY', lng: 'en' },
  { name: 'ليبيا', code: 'LY', lng: 'ar-ly' },
  { name: 'Libia', code: 'LY', lng: 'es' },

  { name: 'Lituanie', code: 'LT', lng: 'fr' },
  { name: 'Lithuania', code: 'LT', lng: 'en' },
  { name: 'لتوانيا', code: 'LT', lng: 'ar-ly' },
  { name: 'Lituania', code: 'LT', lng: 'es' },

  { name: 'Luxembourg', code: 'LU', lng: 'fr' },
  { name: 'Luxembourg', code: 'LU', lng: 'en' },
  { name: 'لوكسمبورغ', code: 'LU', lng: 'ar-ly' },
  { name: 'Luxembourg', code: 'LU', lng: 'es' },

  { name: 'Malaisie', code: 'MY', lng: 'fr' },
  { name: 'Malaysia', code: 'MY', lng: 'en' },
  { name: 'ماليزيا', code: 'MY', lng: 'ar-ly' },
  { name: 'Malasia', code: 'MY', lng: 'es' },

  { name: 'Malawi', code: 'MW', lng: 'fr' },
  { name: 'Malawi', code: 'MW', lng: 'en' },
  { name: 'مالاوي', code: 'MW', lng: 'ar-ly' },
  { name: 'Malaui', code: 'MW', lng: 'es' },

  { name: 'Mali', code: 'ML', lng: 'fr' },
  { name: 'Mali', code: 'ML', lng: 'en' },
  { name: 'مالي', code: 'ML', lng: 'ar-ly' },
  { name: 'Malí', code: 'ML', lng: 'es' },

  { name: 'Maroc', code: 'MA', lng: 'fr' },
  { name: 'Morocco', code: 'MA', lng: 'en' },
  { name: 'المغرب', code: 'MA', lng: 'ar-ly' },
  { name: 'Marruecos', code: 'MA', lng: 'es' },

  { name: 'Mauritanie', code: 'MR', lng: 'fr' },
  { name: 'Mauritania', code: 'MR', lng: 'en' },
  { name: 'موريتانيا', code: 'MR', lng: 'ar-ly' },
  { name: 'Mauritania', code: 'MR', lng: 'es' },

  { name: 'Mexique', code: 'MX', lng: 'fr' },
  { name: 'Mexico', code: 'MX', lng: 'en' },
  { name: 'المكسيك', code: 'MX', lng: 'ar-ly' },
  { name: 'México', code: 'MX', lng: 'es' },

  { name: 'Monténégro', code: 'ME', lng: 'fr' },
  { name: 'Montenegro', code: 'ME', lng: 'en' },
  { name: 'الجبل الأسود', code: 'ME', lng: 'ar-ly' },
  { name: 'Montenegro', code: 'ME', lng: 'es' },

  { name: 'Mozambique', code: 'MZ', lng: 'fr' },
  { name: 'Mozambique', code: 'MZ', lng: 'en' },
  { name: 'موزمبيق', code: 'MZ', lng: 'ar-ly' },
  { name: 'Mozambique', code: 'MZ', lng: 'es' },

  { name: 'Namibie', code: 'NA', lng: 'fr' },
  { name: 'Namibia', code: 'NA', lng: 'en' },
  { name: 'ناميبيا', code: 'NA', lng: 'ar-ly' },
  { name: 'Namibia', code: 'NA', lng: 'es' },

  { name: 'Niger', code: 'NE', lng: 'fr' },
  { name: 'Niger', code: 'NE', lng: 'en' },
  { name: 'النيجر', code: 'NE', lng: 'ar-ly' },
  { name: 'Níger', code: 'NE', lng: 'es' },

  { name: 'Nigéria', code: 'NG', lng: 'fr' },
  { name: 'Nigeria', code: 'NG', lng: 'en' },
  { name: 'نيجيريا', code: 'NG', lng: 'ar-ly' },
  { name: 'Nigeria', code: 'NG', lng: 'es' },

  { name: 'Norvège', code: 'NO', lng: 'fr' },
  { name: 'Norway', code: 'NO', lng: 'en' },
  { name: 'النرويج', code: 'NO', lng: 'ar-ly' },
  { name: 'Noruega', code: 'NO', lng: 'es' },

  { name: 'Nouvelle-Zélande', code: 'NZ', lng: 'fr' },
  { name: 'New Zealand', code: 'NZ', lng: 'en' },
  { name: 'نيوزيلندا', code: 'NZ', lng: 'ar-ly' },
  { name: 'Nueva Zelanda', code: 'NZ', lng: 'es' },

  { name: 'Oman', code: 'OM', lng: 'fr' },
  { name: 'Oman', code: 'OM', lng: 'en' },
  { name: 'عُمان', code: 'OM', lng: 'ar-ly' },
  { name: 'Omán', code: 'OM', lng: 'es' },

  { name: 'Ouganda', code: 'UG', lng: 'fr' },
  { name: 'Uganda', code: 'UG', lng: 'en' },
  { name: 'أوغندا', code: 'UG', lng: 'ar-ly' },
  { name: 'Uganda', code: 'UG', lng: 'es' },

  { name: 'Ouzbékistan', code: 'UZ', lng: 'fr' },
  { name: 'Uzbekistan', code: 'UZ', lng: 'en' },
  { name: 'أوزباكستان', code: 'UZ', lng: 'ar-ly' },
  { name: 'Uzbekistán', code: 'UZ', lng: 'es' },

  { name: 'Pakistan', code: 'PK', lng: 'fr' },
  { name: 'Pakistan', code: 'PK', lng: 'en' },
  { name: 'باكستان', code: 'PK', lng: 'ar-ly' },
  { name: 'Pakistán', code: 'PK', lng: 'es' },

  { name: 'Palestine', code: 'PS', lng: 'fr' },
  { name: 'Palestin', code: 'PS', lng: 'en' },
  { name: 'فلسطين', code: 'PS', lng: 'ar-ly' },
  { name: 'Palestin', code: 'PS', lng: 'es' },

  { name: 'Panama', code: 'PA', lng: 'fr' },
  { name: 'Panama', code: 'PA', lng: 'en' },
  { name: 'بنما', code: 'PA', lng: 'ar-ly' },
  { name: 'Panamá', code: 'PA', lng: 'es' },

  { name: 'Paraguay', code: 'PY', lng: 'fr' },
  { name: 'Paraguay', code: 'PY', lng: 'en' },
  { name: 'باراغواي', code: 'PY', lng: 'ar-ly' },
  { name: 'Paraguay', code: 'PY', lng: 'es' },

  { name: 'Pays-Bas', code: 'NL', lng: 'fr' },
  { name: 'Netherlands', code: 'NL', lng: 'en' },
  { name: 'هولندا', code: 'NL', lng: 'ar-ly' },
  { name: 'Países Bajos', code: 'NL', lng: 'es' },

  { name: 'Pérou', code: 'PE', lng: 'fr' },
  { name: 'Peru', code: 'PE', lng: 'en' },
  { name: 'بيرو', code: 'PE', lng: 'ar-ly' },
  { name: 'Perú', code: 'PE', lng: 'es' },

  { name: 'Philippines', code: 'PH', lng: 'fr' },
  { name: 'Philippines', code: 'PH', lng: 'en' },
  { name: 'الفليبين', code: 'PH', lng: 'ar-ly' },
  { name: 'Filipinas', code: 'PH', lng: 'es' },

  { name: 'Pologne', code: 'PL', lng: 'fr' },
  { name: 'Poland', code: 'PL', lng: 'en' },
  { name: 'بولندا', code: 'PL', lng: 'ar-ly' },
  { name: 'Polonia', code: 'PL', lng: 'es' },

  { name: 'Porto Rico', code: 'PR', lng: 'fr' },
  { name: 'Puerto Rico', code: 'PR', lng: 'en' },
  { name: 'بورتوريكو', code: 'PR', lng: 'ar-ly' },
  { name: 'Puerto Rico', code: 'PR', lng: 'es' },

  { name: 'Portugal', code: 'PT', lng: 'fr' },
  { name: 'Portugal', code: 'PT', lng: 'en' },
  { name: 'البرتغال', code: 'PT', lng: 'ar-ly' },
  { name: 'Portugal', code: 'PT', lng: 'es' },

  { name: 'Qatar', code: 'QA', lng: 'fr' },
  { name: 'Qatar', code: 'QA', lng: 'en' },
  { name: 'قطر', code: 'QA', lng: 'ar-ly' },
  { name: 'Catar', code: 'QA', lng: 'es' },

  { name: 'République centrafricaine', code: 'CF', lng: 'fr' },
  { name: 'Central African Republic', code: 'CF', lng: 'en' },
  { name: 'جمهورية أفريقيا الوسطى', code: 'CF', lng: 'ar-ly' },
  { name: 'República Centroafricana', code: 'CF', lng: 'es' },

  { name: 'République démocratique du Congo', code: 'CD', lng: 'fr' },
  { name: 'Democratic Republic of Congo', code: 'CD', lng: 'en' },
  { name: 'جمهورية الكونغو الديمقراطية', code: 'CD', lng: 'ar-ly' },
  { name: 'República Democrática del Congo', code: 'CD', lng: 'es' },

  { name: 'République tchèque', code: 'CZ', lng: 'fr' },
  { name: 'Czech Republic', code: 'CZ', lng: 'en' },
  { name: 'جمهورية التشيك', code: 'CZ', lng: 'ar-ly' },
  { name: 'República Checa', code: 'CZ', lng: 'es' },

  { name: 'Roumanie', code: 'RO', lng: 'fr' },
  { name: 'Romania', code: 'RO', lng: 'en' },
  { name: 'رومانيا', code: 'RO', lng: 'ar-ly' },
  { name: 'Rumania', code: 'RO', lng: 'es' },

  { name: 'Royaume-Uni', code: 'GB', lng: 'fr' },
  { name: 'United Kingdom', code: 'GB', lng: 'en' },
  { name: 'المملكة المتحدة', code: 'GB', lng: 'ar-ly' },
  { name: 'Reino Unido', code: 'GB', lng: 'es' },

  { name: 'Russie', code: 'RU', lng: 'fr' },
  { name: 'Russia', code: 'RU', lng: 'en' },
  { name: 'روسيا', code: 'RU', lng: 'ar-ly' },
  { name: 'Rusia', code: 'RU', lng: 'es' },

  { name: 'Rwanda', code: 'RW', lng: 'fr' },
  { name: 'Rwanda', code: 'RW', lng: 'en' },
  { name: 'رواندا', code: 'RW', lng: 'ar-ly' },
  { name: 'Ruanda', code: 'RW', lng: 'es' },

  { name: 'Sénégal', code: 'SN', lng: 'fr' },
  { name: 'Senegal', code: 'SN', lng: 'en' },
  { name: 'السنغال', code: 'SN', lng: 'ar-ly' },
  { name: 'Senegal', code: 'SN', lng: 'es' },

  { name: 'Serbie', code: 'RS', lng: 'fr' },
  { name: 'Serbia', code: 'RS', lng: 'en' },
  { name: 'جمهورية صربيا', code: 'RS', lng: 'ar-ly' },
  { name: 'Serbia', code: 'RS', lng: 'es' },

  { name: 'Sierra Leone', code: 'SL', lng: 'fr' },
  { name: 'Sierra Leone', code: 'SL', lng: 'en' },
  { name: 'سيراليون', code: 'SL', lng: 'ar-ly' },
  { name: 'Sierra Leona', code: 'SL', lng: 'es' },

  { name: 'Singapour', code: 'SG', lng: 'fr' },
  { name: 'Singapore', code: 'SG', lng: 'en' },
  { name: 'سنغافورة', code: 'SG', lng: 'ar-ly' },
  { name: 'Singapur', code: 'SG', lng: 'es' },

  { name: 'Slovaquie', code: 'SK', lng: 'fr' },
  { name: 'Slovakia', code: 'SK', lng: 'en' },
  { name: 'سلوفاكيا', code: 'SK', lng: 'ar-ly' },
  { name: 'Eslovaquia', code: 'SK', lng: 'es' },

  { name: 'Slovénie', code: 'SI', lng: 'fr' },
  { name: 'Slovenia', code: 'SI', lng: 'en' },
  { name: 'سلوفينيا', code: 'SI', lng: 'ar-ly' },
  { name: 'Eslovenia', code: 'SI', lng: 'es' },

  { name: 'Somalie', code: 'SO', lng: 'fr' },
  { name: 'Somalia', code: 'SO', lng: 'en' },
  { name: 'الصومال', code: 'SO', lng: 'ar-ly' },
  { name: 'Somalia', code: 'SO', lng: 'es' },

  { name: 'Soudan', code: 'SD', lng: 'fr' },
  { name: 'Sudan', code: 'SD', lng: 'en' },
  { name: 'السودان', code: 'SD', lng: 'ar-ly' },
  { name: 'Sudán', code: 'SD', lng: 'es' },

  { name: 'Suède', code: 'SE', lng: 'fr' },
  { name: 'Sweden', code: 'SE', lng: 'en' },
  { name: 'السويد', code: 'SE', lng: 'ar-ly' },
  { name: 'Suecia', code: 'SE', lng: 'es' },

  { name: 'Suisse', code: 'CH', lng: 'fr' },
  { name: 'Switzerland', code: 'CH', lng: 'en' },
  { name: 'سويسرا', code: 'CH', lng: 'ar-ly' },
  { name: 'Suiza', code: 'CH', lng: 'es' },

  { name: 'Syrie', code: 'SY', lng: 'fr' },
  { name: 'Syria', code: 'SY', lng: 'en' },
  { name: 'سوريا', code: 'SY', lng: 'ar-ly' },
  { name: 'Siria', code: 'SY', lng: 'es' },

  { name: 'Taïwan', code: 'TW', lng: 'fr' },
  { name: 'Taiwan', code: 'TW', lng: 'en' },
  { name: 'تايوان', code: 'TW', lng: 'ar-ly' },
  { name: 'Taiwán', code: 'TW', lng: 'es' },

  { name: 'Tanzanie', code: 'TZ', lng: 'fr' },
  { name: 'Tanzania', code: 'TZ', lng: 'en' },
  { name: 'تنزانيا', code: 'TZ', lng: 'ar-ly' },
  { name: 'Tanzania', code: 'TZ', lng: 'es' },

  { name: 'Tchad', code: 'TD', lng: 'fr' },
  { name: 'Chad', code: 'TD', lng: 'en' },
  { name: 'تشاد', code: 'TD', lng: 'ar-ly' },
  { name: 'Chad', code: 'TD', lng: 'es' },

  { name: 'Thaïlande', code: 'TH', lng: 'fr' },
  { name: 'Thailand', code: 'TH', lng: 'en' },
  { name: 'تايلندا', code: 'TH', lng: 'ar-ly' },
  { name: 'Tailandia', code: 'TH', lng: 'es' },

  { name: 'Togo', code: 'TG', lng: 'fr' },
  { name: 'Togo', code: 'TG', lng: 'en' },
  { name: 'توغو', code: 'TG', lng: 'ar-ly' },
  { name: 'Togo', code: 'TG', lng: 'es' },

  { name: 'Tunisie', code: 'TN', lng: 'fr' },
  { name: 'Tunisia', code: 'TN', lng: 'en' },
  { name: 'تونس', code: 'TN', lng: 'ar-ly' },
  { name: 'Túnez', code: 'TN', lng: 'es' },

  { name: 'Turquie', code: 'TR', lng: 'fr' },
  { name: 'Turkey', code: 'TR', lng: 'en' },
  { name: 'تركيا', code: 'TR', lng: 'ar-ly' },
  { name: 'Turquía', code: 'TR', lng: 'es' },

  { name: 'Ukraine', code: 'UA', lng: 'fr' },
  { name: 'Ukraine', code: 'UA', lng: 'en' },
  { name: 'أوكرانيا', code: 'UA', lng: 'ar-ly' },
  { name: 'Ucrania', code: 'UA', lng: 'es' },

  { name: 'Uruguay', code: 'UY', lng: 'fr' },
  { name: 'Uruguay', code: 'UY', lng: 'en' },
  { name: 'أورغواي', code: 'UY', lng: 'ar-ly' },
  { name: 'Uruguay', code: 'UY', lng: 'es' },

  { name: 'Venezuela', code: 'VE', lng: 'fr' },
  { name: 'Venezuela', code: 'VE', lng: 'en' },
  { name: 'فنزويلا', code: 'VE', lng: 'ar-ly' },
  { name: 'Venezuela', code: 'VE', lng: 'es' },

  { name: 'Yémen', code: 'YE', lng: 'fr' },
  { name: 'Yemen', code: 'YE', lng: 'en' },
  { name: 'اليمن', code: 'YE', lng: 'ar-ly' },
  { name: 'Yemen', code: 'YE', lng: 'es' },

  { name: 'Zambie', code: 'ZM', lng: 'fr' },
  { name: 'Zambia', code: 'ZM', lng: 'en' },
  { name: 'زامبيا', code: 'ZM', lng: 'ar-ly' },
  { name: 'Zambia', code: 'ZM', lng: 'es' },

  { name: 'Zimbabwe', code: 'ZW', lng: 'fr' },
  { name: 'Zimbabwe', code: 'ZW', lng: 'en' },
  { name: 'زمبابوي', code: 'ZW', lng: 'ar-ly' },
  { name: 'Zimbabue', code: 'ZW', lng: 'es' }
];

export default countries;

import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PrivacyPageProps {
  onBack: () => void;
}

export function PrivacyPage({ onBack }: PrivacyPageProps) {
  const { language } = useLanguage();

  const sections = language === 'ko' ? [
    {
      title: '제1조 (개인정보의 처리 목적)',
      content: `Klear(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
① 회원 가입 및 관리: 회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 각종 고지·통지, 고충처리 목적으로 개인정보를 처리합니다.
② 재화 또는 서비스 제공: 물품배송, 서비스 제공, 계약서·청구서 발송, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증, 연령인증, 요금결제·정산, 채권추심을 목적으로 개인정보를 처리합니다.
③ 고충처리: 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 목적으로 개인정보를 처리합니다.`,
    },
    {
      title: '제2조 (개인정보의 처리 및 보유 기간)',
      content: `① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
  - 회원 가입 및 관리: 회원 탈퇴 시까지 (단, 관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당 수사·조사 종료 시까지)
  - 재화 또는 서비스 제공: 재화·서비스 공급완료 및 요금결제·정산 완료시까지 (단, 전자상거래 등에서의 소비자 보호에 관한 법률에 따라 계약 또는 청약철회에 관한 기록은 5년, 대금결제 및 재화 등의 공급에 관한 기록은 5년, 소비자의 불만 또는 분쟁처리에 관한 기록은 3년간 보존)
  - 고충처리: 민원 처리 완료 후 3년`,
    },
    {
      title: '제3조 (처리하는 개인정보의 항목)',
      content: `① 회사는 다음의 개인정보 항목을 처리하고 있습니다.
  - 필수항목: 이메일 주소, 비밀번호, 이름, 주소, 전화번호
  - 선택항목: 생년월일, 성별, 피부 타입
② 서비스 이용 과정에서 아래 개인정보 항목이 자동으로 생성되어 수집될 수 있습니다.
  - IP주소, 쿠키, MAC주소, 서비스 이용기록, 방문기록, 불량 이용기록 등`,
    },
    {
      title: '제4조 (개인정보의 제3자 제공)',
      content: `① 회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
② 회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.
  - 제공받는 자: 배송 대행 업체(CJ대한통운 등)
  - 제공 목적: 상품 배송
  - 제공 항목: 수령인 이름, 주소, 전화번호
  - 보유 및 이용 기간: 배송 완료 후 즉시 파기`,
    },
    {
      title: '제5조 (개인정보 처리의 위탁)',
      content: `① 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
  - 위탁받는 자(수탁자): 결제 서비스 업체(예: Stripe, KG이니시스)
  - 위탁하는 업무의 내용: 결제 처리 및 환불 업무
  - 위탁 기간: 서비스 이용 계약 종료 시까지
② 회사는 위탁계약 체결 시 개인정보 보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.`,
    },
    {
      title: '제6조 (정보주체의 권리·의무 및 행사방법)',
      content: `① 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
  - 개인정보 열람 요구
  - 오류 등이 있을 경우 정정 요구
  - 삭제 요구
  - 처리정지 요구
② 제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.
③ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.`,
    },
    {
      title: '제7조 (개인정보의 파기)',
      content: `① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.
③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.
  - 파기절차: 회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.
  - 파기방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.`,
    },
    {
      title: '제8조 (개인정보의 안전성 확보 조치)',
      content: `회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
① 관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등
② 기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치
③ 물리적 조치: 전산실, 자료보관실 등의 접근통제`,
    },
    {
      title: '제9조 (개인정보 자동 수집 장치의 설치·운영 및 거부)',
      content: `① 회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.
② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터 내의 하드디스크에 저장되기도 합니다.
③ 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도 있습니다.
  - 쿠키 설정 거부 방법: 웹브라우저 상단의 도구 > 인터넷 옵션 > 개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다.
  - 단, 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.`,
    },
    {
      title: '제10조 (개인정보 보호책임자)',
      content: `① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
  - 개인정보 보호책임자: 홍길동 (대표이사)
  - 연락처: hello@klear.co.kr / +82 (2) 1234-5678
② 정보주체께서는 회사의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.`,
    },
    {
      title: '제11조 (개인정보 처리방침의 변경)',
      content: `① 이 개인정보처리방침은 2026년 1월 1일부터 적용됩니다.
② 이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다.
  - 이전 버전 적용일: 2025년 1월 1일 ~ 2025년 12월 31일`,
    },
  ] : [
    {
      title: 'Article 1 (Purpose of Processing Personal Information)',
      content: `Klear (hereinafter "Company") processes personal information for the following purposes. The personal information being processed will not be used for any purposes other than those listed below, and if the purpose of use changes, necessary measures such as obtaining separate consent will be taken in accordance with Article 18 of the Personal Information Protection Act.
① Membership registration and management: Identity verification, member service provision, maintaining member status, preventing misuse, notices, and handling complaints.
② Provision of goods or services: Delivery, service provision, sending contracts and invoices, content provision, personalized services, identity verification, payment processing, and debt collection.
③ Handling grievances: Verification of complainant identity, confirming complaint details, contact/notification for fact-finding, and notifying of processing results.`,
    },
    {
      title: 'Article 2 (Retention and Use Period of Personal Information)',
      content: `① The Company processes and retains personal information within the retention and use period agreed upon when collecting personal information from the data subject or as required by law.
② Retention periods for each category of personal information:
  - Membership registration and management: Until membership withdrawal (unless an investigation is ongoing)
  - Provision of goods or services: Until completion of supply and payment settlement (records of contracts/withdrawal kept for 5 years; payment/supply records for 5 years; consumer complaints for 3 years per the E-commerce Consumer Protection Act)
  - Handling grievances: 3 years after resolution`,
    },
    {
      title: 'Article 3 (Items of Personal Information Processed)',
      content: `① The Company processes the following personal information:
  - Required: Email address, password, name, address, phone number
  - Optional: Date of birth, gender, skin type
② The following personal information may be automatically generated and collected during service use:
  - IP address, cookies, MAC address, service usage records, visit records, and misuse records`,
    },
    {
      title: 'Article 4 (Provision of Personal Information to Third Parties)',
      content: `① The Company processes personal information only within the scope specified in Article 1 and provides personal information to third parties only as permitted under Articles 17 and 18 of the Personal Information Protection Act.
② The Company provides personal information to third parties as follows:
  - Recipient: Delivery service providers (e.g., CJ Logistics)
  - Purpose: Product delivery
  - Items provided: Recipient name, address, phone number
  - Retention period: Immediately destroyed upon delivery completion`,
    },
    {
      title: 'Article 5 (Entrustment of Personal Information Processing)',
      content: `① The Company entrusts personal information processing as follows for smooth operations:
  - Trustee: Payment service providers (e.g., Stripe, KG Inicis)
  - Entrusted tasks: Payment processing and refund operations
  - Period: Until termination of service agreement
② The Company specifies matters such as prohibition of processing beyond the entrusted purpose, technical/administrative protection measures, restrictions on re-entrustment, supervision, and liability for damages in contracts with trustees.`,
    },
    {
      title: 'Article 6 (Rights of Data Subjects and How to Exercise Them)',
      content: `① Data subjects may exercise the following rights with the Company at any time:
  - Request to access personal information
  - Request for correction if there are errors
  - Request for deletion
  - Request to suspend processing
② Rights under Paragraph 1 may be exercised in writing, by phone, email, or fax, and the Company will respond without delay.
③ If a data subject requests correction or deletion, the Company will not use or provide the relevant personal information until the correction or deletion is completed.`,
    },
    {
      title: 'Article 7 (Destruction of Personal Information)',
      content: `① When personal information becomes unnecessary due to expiry of the retention period or achievement of processing purposes, the Company destroys it without delay.
② If personal information must be retained beyond the agreed period due to other laws, it is moved to a separate database or stored separately.
③ Destruction procedures and methods:
  - Procedure: Personal information scheduled for destruction is selected and destroyed upon approval by the Company's Personal Information Protection Officer.
  - Method: Electronic files are destroyed using technical methods that prevent recovery. Printed personal information is destroyed by shredding or incineration.`,
    },
    {
      title: 'Article 8 (Measures to Ensure the Safety of Personal Information)',
      content: `The Company takes the following measures to ensure the safety of personal information:
① Administrative measures: Establishing and implementing internal management plans, regular employee training, etc.
② Technical measures: Managing access rights to personal information processing systems, installing access control systems, encrypting unique identification information, installing security programs.
③ Physical measures: Access control for computer rooms and data storage rooms.`,
    },
    {
      title: 'Article 9 (Installation, Operation, and Rejection of Automatic Personal Information Collection Devices)',
      content: `① The Company uses 'cookies' that store and retrieve usage information to provide personalized services to users.
② Cookies are small pieces of information sent by the server (http) used to operate the website to the user's browser and may be stored on the user's PC hard disk.
③ Users have the right to choose whether to allow cookie installation. Users can allow all cookies, confirm each time a cookie is saved, or refuse all cookies through browser options.
  - To refuse cookies: Tools > Internet Options > Privacy menu in your web browser.
  - Note: Refusing cookies may cause difficulties in using personalized services.`,
    },
    {
      title: 'Article 10 (Personal Information Protection Officer)',
      content: `① The Company has designated a Personal Information Protection Officer to oversee personal information processing and handle complaints and damage relief for data subjects:
  - Officer: Gil-dong Hong (CEO)
  - Contact: hello@klear.co.kr / +82 (2) 1234-5678
② Data subjects may contact the Personal Information Protection Officer regarding any personal information-related inquiries, complaints, or damage relief arising from use of the Company's services. The Company will respond and act without delay.`,
    },
    {
      title: 'Article 11 (Changes to the Privacy Policy)',
      content: `① This Privacy Policy is effective from January 1, 2026.
② Previous versions of the Privacy Policy are available below:
  - Previous version effective: January 1, 2025 – December 31, 2025`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Hero */}
      <div className="bg-white border-b border-[#E6E6E0] pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#2C2C2C]/60 hover:text-[#6F832E] transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            {language === 'ko' ? '홈으로 돌아가기' : 'Back to Home'}
          </button>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-[#EEF2E0] text-[#6F832E] text-xs font-semibold rounded-full uppercase tracking-wider">
              {language === 'ko' ? '법률' : 'Legal'}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-[#111111] mb-3">
            {language === 'ko' ? '개인정보 처리방침' : 'Privacy Policy'}
          </h1>
          <p className="text-[#2C2C2C]/60">
            {language === 'ko'
              ? '최종 수정일: 2026년 1월 1일'
              : 'Last updated: January 1, 2026'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-[#E6E6E0] rounded-3xl p-8 md:p-12">
          <p className="text-[#2C2C2C]/70 mb-10 leading-relaxed">
            {language === 'ko'
              ? 'Klear(이하 "회사")는 개인정보 보호법 등 관련 법령에 따라 이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.'
              : 'Klear (hereinafter "Company") establishes and discloses this Privacy Policy in accordance with the Personal Information Protection Act and related laws, to protect users\' personal information and to handle related grievances swiftly and smoothly.'}
          </p>

          <div className="space-y-10">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04, duration: 0.4 }}
              >
                <h2 className="text-lg font-bold text-[#111111] mb-3 pb-2 border-b border-[#E6E6E0]">
                  {section.title}
                </h2>
                <p className="text-[#2C2C2C]/70 leading-relaxed whitespace-pre-line text-sm">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-[#E6E6E0]">
            <div className="flex items-center gap-3 p-5 bg-[#EEF2E0] rounded-2xl">
              <div>
                <p className="text-sm font-semibold text-[#6F832E]">Klear Co., Ltd.</p>
                <p className="text-xs text-[#2C2C2C]/60 mt-0.5">
                  {language === 'ko'
                    ? '서울특별시 강남구 테헤란로 427 | 대표: 홍길동 | 사업자등록번호: 123-45-67890 | 고객센터: hello@klear.co.kr'
                    : '427 Teheran-ro, Gangnam-gu, Seoul | CEO: Gil-dong Hong | Reg. No: 123-45-67890 | Contact: hello@klear.co.kr'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

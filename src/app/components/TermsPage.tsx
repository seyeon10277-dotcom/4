import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TermsPageProps {
  onBack: () => void;
}

export function TermsPage({ onBack }: TermsPageProps) {
  const { language } = useLanguage();

  const sections = language === 'ko' ? [
    {
      title: '제1조 (목적)',
      content: `본 약관은 Klear(이하 "회사")가 운영하는 온라인 쇼핑몰(이하 "몰")에서 제공하는 서비스의 이용과 관련하여 회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.`,
    },
    {
      title: '제2조 (정의)',
      content: `① "몰"이란 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
② "이용자"란 "몰"에 접속하여 이 약관에 따라 "몰"이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
③ "회원"이라 함은 "몰"에 회원등록을 한 자로서, 계속적으로 "몰"이 제공하는 서비스를 이용할 수 있는 자를 말합니다.
④ "비회원"이라 함은 회원에 가입하지 않고 "몰"이 제공하는 서비스를 이용하는 자를 말합니다.`,
    },
    {
      title: '제3조 (약관의 명시와 개정)',
      content: `① 회사는 이 약관의 내용과 상호, 영업소 소재지, 대표자의 성명, 사업자등록번호, 연락처(전화, 팩스, 전자우편 주소 등)를 이용자가 알 수 있도록 몰의 초기 서비스화면에 게시합니다.
② 회사는 약관의 규제에 관한 법률, 전자상거래 등에서의 소비자보호에 관한 법률, 전자문서 및 전자거래기본법, 소비자기본법 등 관련법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
③ 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행 약관과 함께 몰의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.`,
    },
    {
      title: '제4조 (회원가입)',
      content: `① 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
② 회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
  - 가입신청자가 이 약관 제7조 제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 단 제7조 제3항에 의한 회원자격 상실 후 3년이 경과한 자로 회사의 회원재가입 승낙을 얻은 경우에는 예외로 합니다.
  - 등록 내용에 허위, 기재누락, 오기가 있는 경우.
  - 기타 회원으로 등록하는 것이 "몰"의 기술상 현저히 지장이 있다고 판단되는 경우.`,
    },
    {
      title: '제5조 (구매신청)',
      content: `"몰"이용자는 "몰"상에서 다음 또는 이와 유사한 방법에 의하여 구매를 신청하며, 회사는 이용자가 구매신청을 함에 있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다.
① 재화 등의 검색 및 선택
② 성명, 주소, 전화번호, 전자우편주소(또는 이동전화번호) 등의 입력
③ 약관내용, 청약철회권이 제한되는 서비스, 배송료·설치비 등의 비용부담과 관련한 내용에 대한 확인
④ 이 약관에 동의하고 위 3호의 사항을 확인하거나 거부하는 표시(예, 마우스 클릭)
⑤ 재화 등의 구매신청 및 이에 관한 확인 또는 "몰"의 확인에 대한 동의
⑥ 결제방법의 선택`,
    },
    {
      title: '제6조 (결제방법)',
      content: `"몰"에서 구매한 재화 또는 용역에 대한 대금지급방법은 다음 각 호의 방법 중 가용한 방법으로 할 수 있습니다.
① 신용카드, 체크카드
② 선불카드, 직불카드
③ 온라인 무통장 입금
④ 전자화폐에 의한 결제
⑤ 수령 시 대금지급
⑥ 마일리지 등 "몰"이 지급한 포인트에 의한 결제
⑦ "몰"과 계약을 맺었거나 "몰"이 인정한 상품권에 의한 결제
⑧ 기타 전자적 지급 방법에 의한 대금 지급 등`,
    },
    {
      title: '제7조 (청약철회)',
      content: `① 회사와 재화 등의 구매에 관한 계약을 체결한 이용자는 수신확인의 통지를 받은 날부터 7일 이내에 청약의 철회를 할 수 있습니다.
② 이용자는 재화 등을 배송 받은 경우 다음 각 호의 1에 해당하는 경우에는 반품 및 교환을 할 수 없습니다.
  - 이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된 경우.
  - 이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가 현저히 감소한 경우.
  - 시간의 경과에 의하여 재판매가 곤란할 정도로 재화 등의 가치가 현저히 감소한 경우.
  - 복제가 가능한 재화 등의 포장을 훼손한 경우.
③ 회사는 이용자가 청약철회를 한 날로부터 3영업일 이내에 이미 지급받은 재화 등의 대금을 환급합니다.`,
    },
    {
      title: '제8조 (개인정보 보호)',
      content: `① 회사는 이용자의 개인정보 수집 시 서비스 제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다.
② 회사는 회원가입 시 구매계약 이행에 필요한 정보를 미리 수집하지 않습니다. 다만, 관련 법령상 의무이행을 위하여 구매계약 이전에 본인확인이 필요한 경우로서 최소한의 특정 개인정보를 수집하는 경우에는 그러하지 아니합니다.
③ 회사는 이용자의 개인정보를 수집·이용하는 때에는 당해 이용자에게 그 목적을 고지하고 동의를 받습니다.
④ 회사는 수집된 개인정보를 목적 외의 용도로 이용할 수 없으며, 새로운 이용목적이 발생한 경우 또는 제3자에게 제공하는 경우에는 이용·제공단계에서 당해 이용자에게 그 목적을 고지하고 동의를 받습니다.`,
    },
    {
      title: '제9조 (분쟁해결)',
      content: `① 회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.
② 회사는 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다.
③ 회사와 이용자 간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.`,
    },
    {
      title: '제10조 (준거법 및 재판관할)',
      content: `① 회사와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 이용자의 주소에 의하고, 주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다.
② 이 약관에 명시되지 않은 사항은 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제에 관한 법률, 공정거래위원회가 정하는 전자상거래 등에서의 소비자보호지침 및 관계법령 또는 상관례에 따릅니다.
③ 본 약관은 2026년 1월 1일부터 적용됩니다.`,
    },
  ] : [
    {
      title: 'Article 1 (Purpose)',
      content: `These Terms of Service govern the rights, obligations, and responsibilities between Klear (hereinafter "Company") and users in relation to the services provided by the Company's online shopping mall (hereinafter "Mall").`,
    },
    {
      title: 'Article 2 (Definitions)',
      content: `① "Mall" refers to the virtual marketplace established by the Company using information and communication equipment to allow users to trade goods or services.
② "User" refers to members and non-members who access the Mall and receive services provided by the Mall in accordance with these Terms.
③ "Member" refers to a person who has registered as a member of the Mall and can continuously use the services provided by the Mall.
④ "Non-member" refers to a person who uses the services provided by the Mall without registering as a member.`,
    },
    {
      title: 'Article 3 (Disclosure and Revision of Terms)',
      content: `① The Company shall post the contents of these Terms, trade name, business address, name of representative, business registration number, and contact information (phone, fax, email, etc.) on the initial service screen of the Mall.
② The Company may revise these Terms within the scope permitted by relevant laws such as the Act on Consumer Protection in Electronic Commerce.
③ When revising the Terms, the Company shall announce the revised Terms along with the effective date and reason for revision at least 7 days before the effective date.`,
    },
    {
      title: 'Article 4 (Membership Registration)',
      content: `① A user applies for membership by filling in the membership form prescribed by the Company and expressing agreement to these Terms.
② The Company shall register applicants as members unless any of the following conditions apply:
  - The applicant has previously lost membership status under Article 7, Paragraph 3 (unless 3 years have passed and re-registration is approved).
  - The registration information contains false statements, omissions, or errors.
  - Registration would cause significant technical difficulties for the Mall.`,
    },
    {
      title: 'Article 5 (Purchase Application)',
      content: `Users of the Mall may apply for purchases through the following or similar methods. The Company shall clearly provide users with the following information:
① Search and selection of goods or services
② Entry of name, address, phone number, email address (or mobile number), etc.
③ Confirmation of Terms content, services with restricted withdrawal rights, and costs such as shipping and installation fees
④ Agreement to these Terms and confirmation or rejection of item ③ above (e.g., mouse click)
⑤ Purchase application for goods or services and consent to confirmation by the Mall
⑥ Selection of payment method`,
    },
    {
      title: 'Article 6 (Payment Methods)',
      content: `Payment for goods or services purchased from the Mall may be made using available methods from the following:
① Credit cards and debit cards
② Prepaid cards and direct debit cards
③ Online bank transfer
④ Payment by electronic currency
⑤ Payment upon receipt
⑥ Payment using points issued by the Mall such as mileage
⑦ Payment using gift certificates contracted with or recognized by the Mall
⑧ Other electronic payment methods`,
    },
    {
      title: 'Article 7 (Withdrawal of Offer)',
      content: `① Users who have entered into a purchase contract for goods may withdraw their offer within 7 days from the date of receiving the confirmation notice.
② Users cannot return or exchange goods in the following cases:
  - The goods are lost or damaged due to reasons attributable to the user.
  - The value of the goods has significantly decreased due to use or partial consumption by the user.
  - The value of the goods has significantly decreased over time to the point where resale is difficult.
  - The packaging of reproducible goods has been damaged.
③ The Company shall refund the purchase price within 3 business days from the date the user withdraws the offer.`,
    },
    {
      title: 'Article 8 (Personal Information Protection)',
      content: `① The Company collects the minimum amount of personal information from users necessary for the provision of services.
② The Company does not collect information required for contract fulfillment prior to membership registration, except where identity verification is required by law.
③ When collecting and using personal information, the Company informs users of the purpose and obtains consent.
④ The Company may not use collected personal information for purposes other than those stated, and must inform users and obtain consent before any new use or third-party disclosure.`,
    },
    {
      title: 'Article 9 (Dispute Resolution)',
      content: `① The Company establishes and operates a damage compensation body to reflect legitimate opinions and complaints raised by users.
② Complaints and opinions submitted by users are processed as a priority. If prompt processing is difficult, the user shall be immediately notified of the reason and processing schedule.
③ In the case of user damage relief requests related to electronic commerce disputes between the Company and users, the case may be subject to mediation by the Korea Fair Trade Commission or dispute resolution agencies designated by the Mayor/Governor.`,
    },
    {
      title: 'Article 10 (Governing Law and Jurisdiction)',
      content: `① Lawsuits concerning electronic commerce disputes between the Company and users shall be subject to the exclusive jurisdiction of the district court having jurisdiction over the user's address at the time of filing.
② Matters not specified in these Terms shall be governed by the Act on Consumer Protection in Electronic Commerce, the Act on the Regulation of Terms and Conditions, consumer protection guidelines established by the Korea Fair Trade Commission, and relevant laws and customs.
③ These Terms are effective from January 1, 2026.`,
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
            {language === 'ko' ? '이용약관' : 'Terms of Service'}
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
              ? 'Klear(이하 "회사")의 서비스를 이용해 주셔서 감사합니다. 본 이용약관은 회사의 서비스 이용에 관한 기본적인 사항을 규정합니다. 서비스를 이용하시기 전에 본 약관을 주의 깊게 읽어 주시기 바랍니다.'
              : 'Thank you for using Klear\'s services. These Terms of Service set out the basic terms governing your use of our services. Please read these Terms carefully before using our services.'}
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

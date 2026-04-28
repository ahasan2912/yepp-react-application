import { ArrowRight, CheckCircle2, ClipboardCheck, Mail, XCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import ApprovalSkeleton from '../../../../components/skeleton/ApprovalSkeleton';
import { useGetVendorDetailsQuery } from '../../../../features/shop/shopApi';
import { useNavigate } from 'react-router-dom';

const normalizeStatus = (status) => {
  if (!status) return 'PENDING';

  const upperStatus = status.toUpperCase();

  if (upperStatus === 'APPROVED' || upperStatus === 'ACCEPT') {
    return 'APPROVED';
  }

  if (
    upperStatus === 'REJECTED' ||
    upperStatus === 'REJECT' ||
    upperStatus === 'REACT'
  ) {
    return 'REJECTED';
  }

  return 'PENDING';
};

const statusConfig = {
  PENDING: {
    badge: 'PENDING REVIEW',
    title: 'Shop under review',
    description:
      "We're verifying your shop details to ensure everything is accurate. This usually takes 24-48 hours.",
    statusLabel: 'STATUS',
    statusValue: 'In progress',
    etaLabel: 'EST. TIME',
    etaValue: '24-72 hrs',
    note:
      "We'll email you as soon as your shop is approved and ready to go live on Yepp.",
    badgeClass: 'border-[#FDE68A] bg-[#FEF3C7] text-[#B45309]',
    iconWrapClass:
      'border-[#D7F0DB] bg-white shadow-[0_24px_60px_rgba(76,175,80,0.12)]',
    iconInnerClass: 'border-[#E7F5EA] bg-[#FAFFFB]',
    iconClass: 'text-primary',
    noteClass: 'border-[#BEE6C2] bg-[#EAF9EE]',
    noteIconClass: 'bg-white text-primary',
    statValueClass: 'text-primary',
    haloClass: 'bg-[#EEF8F1]',
    animate: true,
    Icon: ClipboardCheck,
  },
  APPROVED: {
    badge: 'APPROVED',
    title: 'Shop approved',
    description:
      'Your shop has been approved successfully. Everything is ready and you can continue to your dashboard now.',
    statusLabel: 'STATUS',
    statusValue: 'Approved',
    etaLabel: 'UPDATED',
    etaValue: 'Completed',
    note:
      'Your approval is complete. Your shop is ready for the next steps inside the Yepp dashboard.',
    badgeClass: 'border-[#BBF7D0] bg-[#DCFCE7] text-[#15803D]',
    iconWrapClass:
      'border-[#CFF5D8] bg-white shadow-[0_24px_60px_rgba(34,197,94,0.12)]',
    iconInnerClass: 'border-[#DCFCE7] bg-[#F6FFF8]',
    iconClass: 'text-[#16A34A]',
    noteClass: 'border-[#BBF7D0] bg-[#ECFDF3]',
    noteIconClass: 'bg-white text-[#16A34A]',
    statValueClass: 'text-[#16A34A]',
    haloClass: 'bg-[#ECFDF3]',
    animate: false,
    Icon: CheckCircle2,
  },
  REJECTED: {
    badge: 'ACTION REJECTED',
    title: 'Changes Needed Before Approval',
    description:
      'Your application still needs a few changes before approval. Please review your submitted details and update them if needed.',
    statusLabel: 'STATUS',
    statusValue: 'Needs update',
    etaLabel: 'NEXT STEP',
    etaValue: 'Review again',
    note:
      "We'll email you if any correction or resubmission is needed for your shop approval.",
    badgeClass: 'border-[#FECACA] bg-[#FEE2E2] text-[#DC2626]',
    iconWrapClass:
      'border-[#FECACA] bg-white shadow-[0_24px_60px_rgba(239,68,68,0.10)]',
    iconInnerClass: 'border-[#FEE2E2] bg-[#FFF7F7]',
    iconClass: 'text-[#DC2626]',
    noteClass: 'border-[#FECACA] bg-[#FEF2F2]',
    noteIconClass: 'bg-white text-[#DC2626]',
    statValueClass: 'text-[#DC2626]',
    haloClass: 'bg-[#FEF2F2]',
    animate: false,
    Icon: XCircle,
  },
};

const VendorApprovalPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state?.auth);
  const { data: shopDetails, isLoading } = useGetVendorDetailsQuery(user?._id);
  console.log(shopDetails?.data?.shop_approval);

  if (isLoading) {
    return <ApprovalSkeleton />;
  }

  const status = normalizeStatus(shopDetails?.data?.shop_approval);
  const currentStatus = statusConfig[status];
  const StatusIcon = currentStatus.Icon;

  const handleClick = () => {
    navigate('/shop-overview');
  }
  
  return (
    <section className="min-h-screen bg-[#F8FAFC] px-4 pb-10 pt-28">
      <div className="mx-auto max-w-305">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <div className="flex min-h-[calc(100vh-13rem)] items-center justify-center p-8">
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
              <div
                className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold tracking-[0.04em] ${currentStatus.badgeClass}`}
              >
                {currentStatus.badge}
              </div>

              <div
                className={`relative mt-7 flex h-[168px] w-[168px] items-center justify-center ${currentStatus.animate ? 'animate-pulse' : ''}`}
              >
                <div
                  className={`absolute h-[128px] w-[196px] rounded-[46%_54%_52%_48%/44%_38%_62%_56%] ${currentStatus.haloClass}`}
                />
                <div
                  className={`relative flex h-[116px] w-[116px] items-center justify-center rounded-[30px] border ${currentStatus.iconWrapClass}`}
                >
                  <div
                    className={`absolute inset-4 rounded-[22px] border ${currentStatus.iconInnerClass}`}
                  />
                  <StatusIcon
                    className={`relative h-11 w-11 ${currentStatus.iconClass}`}
                    strokeWidth={1.9}
                  />
                </div>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[#202020] sm:text-3xl sm:leading-[1.1]">
                {currentStatus.title}
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-9 text-slate-500">
                {currentStatus.description}
              </p>

              <div className="mt-8 grid w-full max-w-[560px] gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-[#FCFCFB] px-4 py-4 text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    {currentStatus.statusLabel}
                  </p>
                  <p className={`mt-2 text-2xl font-semibold ${currentStatus.statValueClass}`}>
                    {currentStatus.statusValue}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-[#FCFCFB] px-4 py-4 text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                    {currentStatus.etaLabel}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-[#202020]">
                    {currentStatus.etaValue}
                  </p>
                </div>
              </div>

              <div
                className={`mt-7 flex w-full max-w-[560px] items-start gap-4 rounded-2xl border px-5 py-5 text-left ${currentStatus.noteClass}`}
              >
                <div
                  className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${currentStatus.noteIconClass}`}
                >
                  <Mail size={20} strokeWidth={1.8} />
                </div>

                <p className="text-lg leading-8 text-slate-700">
                  {currentStatus.note}
                </p>
              </div>

              <div className="mt-7 flex w-full max-w-[560px] flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleClick}
                  disabled={status === 'PENDING' || status === 'REJECTED'}
                  className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-lg font-semibold text-white shadow-[0_14px_28px_rgba(76,175,80,0.18)] transition-all
                    bg-primary hover:bg-secondary
                    disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:opacity-70">
                  Go to dashboard
                  <ArrowRight
                    size={20}
                    className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorApprovalPage;

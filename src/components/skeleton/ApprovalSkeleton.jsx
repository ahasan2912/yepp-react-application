const ApprovalSkeleton = () => {
  return (
    <section className="min-h-screen animate-pulse bg-[#F8FAFC] px-4 pb-14 pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
          <div className="flex min-h-[calc(100vh-13rem)] items-center justify-center px-6 py-12 sm:px-10 sm:py-16">
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
              <div className="h-8 w-40 rounded-full bg-slate-200" />

              <div className="relative mt-7 flex h-[168px] w-[168px] items-center justify-center">
                <div className="absolute h-[128px] w-[196px] rounded-[46%_54%_52%_48%/44%_38%_62%_56%] bg-slate-100" />
                <div className="relative flex h-[116px] w-[116px] items-center justify-center rounded-[30px] border border-slate-200 bg-white">
                  <div className="absolute inset-4 rounded-[22px] border border-slate-100 bg-slate-50" />
                  <div className="relative h-11 w-11 rounded-xl bg-slate-200" />
                </div>
              </div>

              <div className="h-10 w-72 rounded-lg bg-slate-200" />

              <div className="mt-5 space-y-3">
                <div className="h-5 w-[560px] max-w-full rounded bg-slate-200" />
                <div className="h-5 w-[500px] max-w-full rounded bg-slate-200" />
              </div>

              <div className="mt-8 grid w-full max-w-[560px] gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-[#FCFCFB] px-4 py-4 text-left">
                  <div className="h-3 w-16 rounded bg-slate-200" />
                  <div className="mt-3 h-8 w-28 rounded bg-slate-200" />
                </div>

                <div className="rounded-xl border border-slate-200 bg-[#FCFCFB] px-4 py-4 text-left">
                  <div className="h-3 w-16 rounded bg-slate-200" />
                  <div className="mt-3 h-8 w-28 rounded bg-slate-200" />
                </div>
              </div>

              <div className="mt-7 flex w-full max-w-[560px] items-start gap-4 rounded-2xl border border-slate-200 bg-slate-100 px-5 py-5 text-left">
                <div className="h-11 w-11 shrink-0 rounded-2xl bg-slate-200" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 w-full rounded bg-slate-200" />
                  <div className="h-5 w-[85%] rounded bg-slate-200" />
                </div>
              </div>

              <div className="mt-7 flex w-full max-w-[560px] flex-col gap-3 sm:flex-row">
                <div className="h-12 flex-1 rounded-xl bg-slate-200" />
                <div className="h-12 flex-1 rounded-xl bg-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApprovalSkeleton;

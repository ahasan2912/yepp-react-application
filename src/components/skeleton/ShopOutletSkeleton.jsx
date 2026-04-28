const ShopOutletSkeleton = () => {
  return (
    <div className="bg-white min-h-[70vh] px-4 pt-32 pb-12">
      <div className="max-w-305 mx-auto space-y-6">
        {/* Top Brand Section */}
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
          <div className="h-32 w-32 shrink-0 animate-pulse rounded-full border-2 border-[var(--primary-color)] bg-gray-200" />

          <div className="flex-1 space-y-3">
            <div className="h-10 w-72 animate-pulse rounded-md bg-gray-200" />
            <div className="h-5 w-full max-w-2xl animate-pulse rounded-md bg-gray-200" />
          </div>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Side */}
            <div className="p-6 lg:col-span-5">
              <div className="mb-6 h-10 w-48 animate-pulse rounded-md bg-gray-200" />

              <div className="space-y-5">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-gray-200 bg-[color-mix(in_srgb,var(--primary-color)_5%,white)] p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <div className="mt-1 h-5 w-5 animate-pulse rounded bg-gray-200" />

                        <div className="min-w-0 flex-1 space-y-3">
                          <div className="h-6 w-4/5 animate-pulse rounded-md bg-gray-200" />
                          <div className="h-4 w-24 animate-pulse rounded-md bg-gray-200" />
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 animate-pulse rounded bg-gray-200" />
                        <div className="h-11 w-20 animate-pulse rounded-lg bg-gray-200" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className="border-t border-gray-200 lg:col-span-7 lg:border-l lg:border-t-0">
              {/* Map area */}
              <div className="h-[260px] w-full animate-pulse bg-gray-200 md:h-[380px]" />

              {/* Bottom info */}
              <div className="flex flex-col justify-between gap-3 px-4 py-4 md:flex-row md:items-center md:px-6">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
                  <div className="h-6 w-72 animate-pulse rounded-md bg-gray-200" />
                </div>

                <div className="h-6 w-40 animate-pulse rounded-md bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopOutletSkeleton;

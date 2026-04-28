export default function VendorProfileSkeleton() {
  const isLoading = true;

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-12">
      <div className="max-w-305 mx-auto space-y-6">
        {isLoading ? <ProfileSkeleton /> : <ActualProfile />}
      </div>
    </div>
  );
}

function SkeletonBox({ className = "" }) {
  return (
    <div className={`animate-pulse bg-slate-200 rounded-md ${className}`} />
  );
}

function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* Top Profile Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          {/* Avatar */}
          <div className="relative">
            <SkeletonBox className="h-24 w-24 rounded-full" />
            <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white bg-slate-300 animate-pulse" />
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <SkeletonBox className="h-8 w-52" />
              <SkeletonBox className="h-6 w-20 rounded-full" />
            </div>

            <SkeletonBox className="h-5 w-64" />

            <div className="flex flex-wrap gap-2 pt-1">
              <SkeletonBox className="h-7 w-24 rounded-full" />
              <SkeletonBox className="h-7 w-24 rounded-full" />
              <SkeletonBox className="h-7 w-24 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <SkeletonBox className="h-12 w-full rounded-xl" />
        <SkeletonBox className="h-12 w-full rounded-xl" />
      </div>

      {/* Personal Info */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
        <div className="space-y-4">
          <SkeletonBox className="h-7 w-52" />
          <div className="h-px w-full bg-slate-200" />
        </div>

        {/* Grid */}
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <SkeletonBox className="h-4 w-24" />
              {i >= 2 ? (
                <SkeletonBox className="h-7 w-28 rounded-full" />
              ) : (
                <SkeletonBox className="h-6 w-52" />
              )}
            </div>
          ))}
        </div>

        {/* Device Card */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="space-y-4">
            <SkeletonBox className="h-4 w-32" />

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <SkeletonBox className="h-12 w-12 rounded-xl" />
                <div className="space-y-2">
                  <SkeletonBox className="h-5 w-44" />
                  <SkeletonBox className="h-4 w-56" />
                </div>
              </div>

              <SkeletonBox className="h-7 w-24 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActualProfile() {
  return (
    <div className="space-y-6">
      {/* Top Card */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
              NA
            </div>
            <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-white bg-green-500" />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold">Nayem Ahmed</h2>
              <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_srgb,var(--primary-color)_15%,white)] text-primary">
                VERIFIED
              </span>
            </div>
            <p className="text-slate-500 text-sm">
              nayemalways.sm@gmail.com
            </p>

            <div className="flex gap-2">
              <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">
                Vendor
              </span>
              <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                Active
              </span>
              <span className="px-3 py-1 text-xs bg-orange-100 text-orange-600 rounded-full">
                Shop Active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid md:grid-cols-2 gap-3">
        <button className="h-12 rounded-xl bg-gray-100">
          Edit Profile Details
        </button>
        <button className="h-12 rounded-xl bg-primary text-white">
          Change Password
        </button>
      </div>

      {/* Info */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-6">
        <h3 className="font-semibold text-lg">Personal Information</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <Info label="Full Name" value="Nayem Ahmed" />
          <Info label="Email Address" value="nayemalways.sm@gmail.com" />
          <Info label="Role" badge="Vendor" />
          <Info label="Account Status" badge="Active" />
          <Info label="Profile Verified" badge="Identity Confirmed" />
          <Info label="Shop Status" badge="Shop Created" />
        </div>

        {/* Device */}
        <div className="rounded-xl border bg-slate-50 p-5 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center">
              📱
            </div>
            <div>
              <p className="font-medium">Android Smartphone</p>
              <p className="text-sm text-slate-500">
                Last seen: March 30, 2026 · Dhaka, BD
              </p>
            </div>
          </div>

          <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-md">
            ONLINE NOW
          </span>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value, badge }) {
  return (
    <div>
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      {value && <p className="font-medium">{value}</p>}
      {badge && (
        <span className="px-3 py-1 text-xs bg-slate-100 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
}

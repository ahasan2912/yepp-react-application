const ProfileDetails = ({ currentVendor }) => {
    const { email, isActive, isShopCreated, isVerified, role, user_name, _id } = currentVendor?.data || {};
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 border-b border-gray-400 pb-4">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { label: 'Full Name', value: user_name },
                        { label: 'Email Address', value: email },
                        { label: 'Role', value: role, isBadge: true, color: '#28B8D7' },
                        { label: 'Account Status', value: isActive ? 'ACTIVE' : 'NOT ACTIVE', isBadge: true, color: '#10B981' },
                        { label: 'Profile Verified', value: isVerified ? 'VERIFIED' : 'NOT VERIFIED', isBadge: true, color: '#28B8D7' },
                        { label: 'Shop Status', value: isShopCreated ? 'SHOP CREATED' : 'NOT SHOP CREATED', isBadge: true, color: '#F59E0B' },
                    ].map((item, i) => (
                        <div key={i} className="space-y-1.5">
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                            {item.isBadge ? (
                                <div className="inline-block px-4 py-1 rounded-md text-sm font-bold"
                                    style={{ backgroundColor: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}>
                                    {item.value}
                                </div>
                            ) : (
                                <p className="text-slate-800 font-semibold text-lg">{item.value}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;
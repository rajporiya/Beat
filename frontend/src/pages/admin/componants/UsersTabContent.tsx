import { useMusicStore } from '@/stores/useMusicStore';
import { Loader2, Users } from 'lucide-react';

const UsersTabContent = () => {
  const { users } = useMusicStore();

  return (
    <section className='rounded-xl bg-[#181818] p-5 sm:p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h2 className='flex items-center gap-2 text-lg font-bold'>
            <Users className='size-5 text-blue-500' />
            User library
          </h2>
          <p className='mt-1 text-sm text-zinc-400'>All registered users.</p>
        </div>
        <span className='rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-white'>{users.length}</span>
      </div>

      {users.length ? (
        <div className='overflow-x-auto'>
          <table className='w-full text-left text-sm'>
            <thead>
              <tr className='border-b border-white/10 text-zinc-400'>
                <th className='py-3 pr-4 font-medium'>User</th>
                <th className='hidden py-3 pr-4 font-medium md:table-cell'>Email</th>
                <th className='hidden py-3 pr-4 font-medium lg:table-cell'>Role</th>
                <th className='py-3 font-medium'>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className='border-b border-white/5 hover:bg-[#242424]'>
                  <td className='py-3 pr-4'>
                    <div className='flex items-center gap-3'>
                      {user.imageUrl ? (
                        <img src={user.imageUrl} alt={user.fullName} className='size-10 rounded-full object-cover' />
                      ) : (
                        <div className='grid size-10 place-items-center rounded-full bg-[#242424] text-zinc-400'>
                          <Users className='size-5' />
                        </div>
                      )}
                      <span className='font-medium text-white'>{user.fullName}</span>
                    </div>
                  </td>
                  <td className='hidden py-3 pr-4 text-zinc-400 md:table-cell'>{user.email || "-"}</td>
                  <td className='hidden py-3 pr-4 lg:table-cell'>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${user.role === "admin" ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-zinc-300"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className='py-3 text-zinc-400'>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='py-12 text-center text-zinc-500'>
          <Loader2 className='mx-auto mb-3 size-7 animate-spin' />
          No users have registered yet.
        </div>
      )}
    </section>
  );
};

export default UsersTabContent;
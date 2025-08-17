import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import Visualizer from "@/components/Visualizer";

export default async function PublicPage({ params }:{ params: { username: string } }){
  const user = await prisma.user.findUnique({ where: { username: params.username }, include: { profile: true } });
  if(!user) return <div className="py-20 text-center">Profile not found</div>;
  const products = await prisma.product.findMany({ where: { userId: user.id } });
  const events = await prisma.event.findMany({ where: { userId: user.id } });
  const tracks = await prisma.musicTrack.findMany({ where: { userId: user.id } });
  const brand = user.profile?.brandColor || '#111827';

  return (
    <div>
      <style>{`:root { --brand: ${brand}; }`}</style>
      <div className="rounded-2xl p-6 bg-brand text-white">
        <h1 className="text-3xl font-extrabold">{user.username}</h1>
        <p className="opacity-90">{user.profile?.welcome || 'Welcome to my page'}</p>
      </div>

      {user.role === 'SELLER' && (
        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-bold">Products</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(p=>(
              <li key={p.id} className="border rounded-2xl p-3">
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-600">₦{(p.price/100).toFixed(2)}</div>
                <form action={`/api/public/buy?product=${p.id}`} method="post">
                  <button className="mt-2 px-3 py-2 rounded-2xl bg-black text-white text-sm">Buy</button>
                </form>
              </li>
            ))}
          </ul>
        </section>
      )}

      {user.role === 'VENDOR' && (
        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-bold">Events</h2>
          <ul className="space-y-2">
            {events.map(e=>(
              <li key={e.id} className="border rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold">{e.title}</div>
                  <div className="text-sm text-gray-600">{e.venue || '—'} • {e.startsAt?.toISOString().slice(0,10) || 'TBA'}</div>
                </div>
                <Link className="px-3 py-2 rounded-2xl bg-black text-white text-sm" href={`/public/event/${e.id}`}>Tickets</Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {user.role === 'MUSICIAN' && (
        <section className="mt-6 space-y-4">
          <h2 className="text-xl font-bold">Music</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tracks.map(t=>(
              <li key={t.id} className="border rounded-2xl p-3 space-y-2">
                {t.coverUrl && <Image src={t.coverUrl} alt="" width={400} height={400} className="rounded-2xl w-full h-48 object-cover" />}
                <div className="font-semibold">{t.title}</div>
                <div className="relative">
                  <audio id={`audio-${t.id}`} controls src={t.previewUrl} className="w-full" />
                  <Visualizer audioSelector={`#audio-${t.id}`} />
                </div>
                {t.fullLink && <a className="underline text-sm" href={t.fullLink} target="_blank">Listen Full Track</a>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

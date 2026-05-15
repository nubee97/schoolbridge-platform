import { formatDistanceToNow } from 'date-fns'
import { BookOpen, CalendarCheck, Heart, MessageCircle, SmilePlus, Sparkles } from 'lucide-react'

const typeIcon = { photo: Sparkles, homework: BookOpen, attendance: CalendarCheck, report: BookOpen, announcement: Sparkles }

export default function FeedCard({ post, student, author }) {
  const Icon = typeIcon[post.post_type] || Sparkles
  const media = post.media || post.post_media || []
  const reactions = post.reactions || { heart: 0, clap: 0, smile: 0 }
  return (
    <article className="card overflow-hidden">
      <div className="p-5">
        <div className="flex items-start gap-3">
          <img src={student?.photo_url} className="h-12 w-12 rounded-2xl object-cover" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-slate-900">{post.title}</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold capitalize text-blue-700"><Icon size={13}/>{post.post_type}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">{author?.full_name || 'Teacher'} · {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-700">{post.content}</p>
      </div>
      {media?.[0]?.file_url && <img src={media[0].file_url} className="h-72 w-full object-cover" />}
      <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
        <div className="flex gap-2">
          <button className="rounded-full bg-rose-50 px-3 py-2 text-sm font-bold text-rose-600">❤️ {reactions.heart || reactions.length || 0}</button>
          <button className="rounded-full bg-amber-50 px-3 py-2 text-sm font-bold text-amber-600">👏 {reactions.clap || 0}</button>
          <button className="rounded-full bg-teal-50 px-3 py-2 text-sm font-bold text-teal-600">😊 {reactions.smile || 0}</button>
        </div>
        <button className="flex items-center gap-2 text-sm font-semibold text-slate-500"><MessageCircle size={17}/> Comment</button>
      </div>
      {post.comments?.length > 0 && <div className="border-t border-slate-100 bg-slate-50 px-5 py-4"><p className="text-sm text-slate-700"><span className="font-bold">{post.comments[0].author}:</span> {post.comments[0].content}</p></div>}
    </article>
  )
}

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { MessageCircle, UserCircle2, Loader2, AlertCircle, Send, ImagePlus, X, Pin } from 'lucide-react';
import { motion } from "framer-motion";
import { supabase } from '../supabase';

const Comment = memo(({ comment, formatDate, index, isPinned = false }) => (
    <div 
        className={`px-5 pt-5 pb-4 rounded-2xl border transition-all ${
            isPinned 
                ? 'bg-zinc-50 border-zinc-900/10 shadow-sm' 
                : 'bg-white border-zinc-100'
        }`}
    >
        {isPinned && (
            <div className="flex items-center gap-2 mb-4 text-zinc-900">
                <Pin className="w-4 h-4 fill-zinc-900" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Pinned Comment</span>
            </div>
        )}
        <div className="flex items-start gap-4">
            {comment.profile_image ? (
                <img
                    src={comment.profile_image}
                    alt={`${comment.user_name}'s profile`}
                    className="w-10 h-10 rounded-full object-cover border border-zinc-200 flex-shrink-0"
                    loading="lazy"
                />
            ) : (
                <div className="p-2 rounded-full bg-zinc-100 text-zinc-400">
                    <UserCircle2 className="w-6 h-6" />
                </div>
            )}
            <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between gap-4 mb-1">
                    <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-zinc-900 truncate">
                            {comment.user_name}
                        </h4>
                        {isPinned && (
                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-zinc-900 text-white rounded-md">
                                Admin
                            </span>
                        )}
                    </div>
                    <span className="text-xs text-zinc-400 whitespace-nowrap font-medium">
                        {formatDate(comment.created_at)}
                    </span>
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed mt-2">
                    {comment.content}
                </p>
            </div>
        </div>
    </div>
));

const CommentForm = memo(({ onSubmit, isSubmitting, error }) => {
    const [newComment, setNewComment] = useState('');
    const [userName, setUserName] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleImageChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB. Please choose a smaller image.');
                if (e.target) e.target.value = '';
                return;
            }
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file.');
                if (e.target) e.target.value = '';
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    }, []);

    const handleTextareaChange = useCallback((e) => {
        setNewComment(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (!newComment.trim() || !userName.trim()) return;
        onSubmit({ newComment, userName, imageFile });
        setNewComment('');
        setUserName('');
        setImagePreview(null);
        setImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }, [newComment, userName, imageFile, onSubmit]);

    return (
        <form onSubmit={handleSubmit} className="space-y-5 bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
            <div className="space-y-2">
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    maxLength={15}
                    placeholder="Nama Anda"
                    className="w-full p-3.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all font-medium"
                    required
                />
            </div>

            <div className="space-y-2">
                <textarea
                    ref={textareaRef}
                    value={newComment}
                    maxLength={200}
                    onChange={handleTextareaChange}
                    placeholder="Tuliskan komentar..."
                    className="w-full p-4 rounded-xl bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all resize-none min-h-[100px]"
                    required
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-4">
                    {imagePreview ? (
                        <div className="flex items-center gap-4 w-full bg-white p-3 border border-zinc-200 rounded-xl">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-12 h-12 rounded-full object-cover border border-zinc-200"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setImagePreview(null);
                                    setImageFile(null);
                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                }}
                                className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-medium"
                            >
                                <X className="w-4 h-4" /> Batal
                            </button>
                        </div>
                    ) : (
                        <div className="w-full">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-zinc-500 hover:text-zinc-900 transition-all border border-dashed border-zinc-300 hover:border-zinc-500 font-medium text-sm"
                            >
                                <ImagePlus className="w-5 h-5" />
                                <span>Tambah Foto Profil (Opsional)</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-zinc-900 rounded-xl font-semibold text-white transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Mengirim...</span>
                    </>
                ) : (
                    <>
                        <Send className="w-4 h-4" />
                        <span>Kirim Komentar</span>
                    </>
                )}
            </button>
        </form>
    );
});

const Komentar = () => {
    const [comments, setComments] = useState([]);
    const [pinnedComment, setPinnedComment] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPinnedComment = async () => {
            try {
                const { data, error } = await supabase.from('portfolio_comments').select('*').eq('is_pinned', true).single();
                if (error && error.code !== 'PGRST116') return;
                if (data) setPinnedComment(data);
            } catch (error) {
                console.error('Error fetching pinned comment:', error);
            }
        };
        fetchPinnedComment();
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            const { data, error } = await supabase.from('portfolio_comments').select('*').eq('is_pinned', false).order('created_at', { ascending: false });
            if (!error) setComments(data || []);
        };
        fetchComments();

        const subscription = supabase
            .channel('portfolio_comments')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'portfolio_comments', filter: 'is_pinned=eq.false' }, () => {
                fetchComments();
            })
            .subscribe();

        return () => subscription.unsubscribe();
    }, []);

    const uploadImage = useCallback(async (imageFile) => {
        if (!imageFile) return null;
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `profile-images/${fileName}`;
        const { error: uploadError } = await supabase.storage.from('profile-images').upload(filePath, imageFile);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('profile-images').getPublicUrl(filePath);
        return data.publicUrl;
    }, []);

    const handleCommentSubmit = useCallback(async ({ newComment, userName, imageFile }) => {
        setError('');
        setIsSubmitting(true);
        try {
            const profileImageUrl = await uploadImage(imageFile);
            const { error } = await supabase.from('portfolio_comments').insert([
                { content: newComment, user_name: userName, profile_image: profileImageUrl, is_pinned: false, created_at: new Date().toISOString() }
            ]);
            if (error) throw error;
        } catch (error) {
            setError('Gagal memposting komentar.');
        } finally {
            setIsSubmitting(false);
        }
    }, [uploadImage]);

    const formatDate = useCallback((timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const now = new Date();
        const diffMinutes = Math.floor((now - date) / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMinutes < 1) return 'Baru saja';
        if (diffMinutes < 60) return `${diffMinutes}m yang lalu`;
        if (diffHours < 24) return `${diffHours}j yang lalu`;
        if (diffDays < 7) return `${diffDays}h yang lalu`;
        return new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
    }, []);

    const totalComments = comments.length + (pinnedComment ? 1 : 0);

    return (
        <div className="w-full">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl bg-zinc-100">
                    <MessageCircle className="w-6 h-6 text-zinc-900" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-900">
                    Komentar Publik <span className="text-zinc-400 font-medium text-lg">({totalComments})</span>
                </h3>
            </div>
            
            <div className="space-y-8">
                {error && (
                    <div className="flex items-center gap-2 p-4 text-red-600 bg-red-50 border border-red-100 rounded-xl">
                        <AlertCircle className="w-5 h-5" />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}
                
                <CommentForm onSubmit={handleCommentSubmit} isSubmitting={isSubmitting} error={error} />

                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {pinnedComment && (
                        <Comment comment={pinnedComment} formatDate={formatDate} index={0} isPinned={true} />
                    )}
                    
                    {comments.length === 0 && !pinnedComment ? (
                        <div className="text-center py-12 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
                            <UserCircle2 className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                            <p className="text-zinc-500 font-medium">Belum ada komentar. Jadilah yang pertama!</p>
                        </div>
                    ) : (
                        comments.map((comment, index) => (
                            <Comment key={comment.id} comment={comment} formatDate={formatDate} index={index + (pinnedComment ? 1 : 0)} isPinned={false} />
                        ))
                    )}
                </div>
            </div>

            {/* CSS Scrollbar Minimalis (Light Mode) */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f4f4f5; border-radius: 8px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #d4d4d8; border-radius: 8px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #a1a1aa; }
            `}</style>
        </div>
    );
};

export default Komentar;
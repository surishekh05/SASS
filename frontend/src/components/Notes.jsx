import { useState, useEffect } from "react";
import { getNotes, createNote, deleteNote, upgradeTenant } from "../api";
import { getToken, parseToken } from "../auth";
import Header from "./Header";
import UpgradePrompt from "./UpgradePrompt";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tenantPlan, setTenantPlan] = useState("Free");
    const [showUpgradeCards, setShowUpgradeCards] = useState(false);
    const [dismissed, setDismissed] = useState(false); // track if user closed the overlay temporarily
    const user = parseToken();
    const token = getToken();

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const data = await getNotes(token);
        if (Array.isArray(data)) {
            setNotes(data);
            // Show upgrade cards if over limit and not dismissed, and tenant is Free
            if (data.length >= 3 && user.role === "Member" && tenantPlan === "Free" && !dismissed) {
                setShowUpgradeCards(true);
            } else {
                setShowUpgradeCards(false);
            }
        }
    };

    const handleCreate = async () => {
        const data = await createNote(token, title, content);
        if (data.error) {
            alert(data.error);
        } else {
            setTitle("");
            setContent("");
            const updatedNotes = await getNotes(token); // fetch the latest notes immediately
            setNotes(updatedNotes);
            // Check the latest notes count to decide whether to show the cards again
            if (updatedNotes.length >= 3 && user.role === "Member" && tenantPlan === "Free") {
                setDismissed(false);
                setShowUpgradeCards(true); // explicitly show the cards
            }
        }
    };

    const handleDelete = async (id) => {
        await deleteNote(token, id);
        fetchNotes();
    };

    const handleUpgrade = async () => {
        await upgradeTenant(token, user.tenantSlug);
        setTenantPlan("Pro");
        setShowUpgradeCards(false);
        fetchNotes();
    };

    const handleClose = () => {
        setDismissed(true); // mark dismissed temporarily
        setShowUpgradeCards(false);
    };

    return (
        <div>
            <Header />
            <div className="max-w-2xl mx-auto mt-6 p-4 relative">

                {/* Backdrop dimming when upgrade cards are shown */}
                {showUpgradeCards && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity animate-fadeIn"></div>
                )}

                {/* Upgrade cards overlay */}
                {showUpgradeCards && (
                    <div className="absolute top-0 left-0 right-0 bg-white p-6 rounded shadow-md z-30 animate-fadeIn">
                        {/* Close button */}
                        <div className="flex justify-end mb-4">
                            <button onClick={handleClose} className="text-gray-500 hover:text-gray-800 text-xl font-bold">
                                ✖
                            </button>
                        </div>
                        {/* Cards container */}
                        <div className="flex flex-col md:flex-row gap-4 justify-center items-start">
                            <UpgradePrompt onUpgrade={handleUpgrade} />
                        </div>
                    </div>
                )}

                {/* Notes input section */}
                <div className={`space-y-2 mb-4 ${showUpgradeCards ? "pt-48" : ""}`}>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border p-2 rounded" />
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" className="w-full border p-2 rounded"></textarea>
                    <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Create Note</button>
                </div>

                {/* Notes list */}
                <div className="space-y-4">
                    {notes.map(note => (
                        <div key={note.id} className="p-4 border rounded shadow-md flex justify-between items-start space-x-4 animate-fadeIn" style={{ transition: 'all 0.3s ease' }}>
                            <div>
                                <h4 className="font-bold">{note.title}</h4>
                                <p>{note.content}</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <button onClick={() => handleDelete(note.id)} className="text-red-500 hover:text-red-700">Delete</button>
                                <span className="text-xs text-gray-500 mt-2">{new Date().toLocaleTimeString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function App() {
  const [session, setSession] = useState(null);
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));

    fetchThoughts();
  }, []);

  async function fetchThoughts() {
    const { data, error } = await supabase.from('thoughts').select('*').order('created_at', { ascending: false });
    if (!error) setThoughts(data);
  }

  async function addThought() {
    if (!newThought.trim()) return;
    const { error } = await supabase.from('thoughts').insert([{ content: newThought }]);
    if (!error) {
      setNewThought('');
      fetchThoughts();
    }
  }

  async function signInWithEmail() {
    const email = prompt('Enter your email:');
    const password = prompt('Enter your password:');
    await supabase.auth.signInWithPassword({ email, password });
  }

  async function signUpWithEmail() {
    const email = prompt('Enter your email:');
    const password = prompt('Enter your password:');
    await supabase.auth.signUp({ email, password });
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className="container">
      <h1>ThoughtShare</h1>
      {!session ? (
        <div>
          <button onClick={signInWithEmail}>Login</button>
          <button onClick={signUpWithEmail}>Register</button>
        </div>
      ) : (
        <div>
          <button onClick={signOut}>Logout</button>
          <div>
            <input
              type="text"
              placeholder="Share your thought"
              value={newThought}
              onChange={(e) => setNewThought(e.target.value)}
            />
            <button onClick={addThought}>Post</button>
          </div>
          <ul>
            {thoughts.map((t) => (
              <li key={t.id}>{t.content}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

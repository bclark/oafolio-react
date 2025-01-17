import { supabase } from '../../../utils/supabase';

export default async function UserPage({ params }) {
  const { id } = params;

  // Fetch the user data from Supabase
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', id)
    .single();

  if (error) {
    console.error('Error fetching user:', error.message);
    return <h1>User not found</h1>;
  }

  // Fetch art associated with this user
  const { data: art, error: artError } = await supabase
    .from('art')
    .select('*')
    .eq('user_id', id);

  if (artError) {
    console.error('Error fetching art:', artError.message);
  }

  return (
    <div>
      <h1>{user.name}'s Art</h1>
      {art && art.length > 0 ? (
        <div>
          {art.map((piece) => (
            <div key={piece.id} style={{ marginBottom: '20px' }}>
              <img
                src={piece.image_url}
                alt={piece.title}
                style={{ width: '200px', height: 'auto' }}
              />
              <h2>{piece.title}</h2>
              <p>{piece.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No art found for this user.</p>
      )}
    </div>
  );
}
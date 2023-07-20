from ai_play import aiPlay

marker = "O"

def test_no_changes_if_there_are_no_empty_squares():
  squares = [
    'X', 'O', 'X',
    'O', 'X', 'O',
    'X', 'O', 'X'
  ]
  result = aiPlay(squares, marker)
  assert result == squares

def test_win_if_winning_move_is_available():
  squares = [
    None, None, None,
    'O', 'X', None,
    'O', None, None
  ]
  result = aiPlay(squares, marker)
  assert result[0] == marker

def test_block_a_winning_move_from_the_opponent():
  squares =[
    None, None, None,
    None, 'X', None,
    'O', None, 'X'
  ]
  result = aiPlay(squares, marker)
  assert result[0] == marker

def test_mark_the_center_square_if_available():
  squares = [
    'X', None, None,
    None, None , None,
    None, None, None
  ]
  result = aiPlay(squares, marker)
  assert result[4] == marker

def test_mark_corner_square_if_available():
  squares = [
    None, None, None,
    None, 'X', None,
    None, None, None
  ]
  result = aiPlay(squares, marker)
  assert result[0] == marker or result[2] == marker or result[6] == marker or result[8] == marker

def test_make_random_move_if_no_winning_moves_available():
  squares = [
    "O", "X", "X",
    "X", "O", "O",
    "O", None, "X"
  ]
  result = aiPlay(squares, marker)
  assert result[7] == marker


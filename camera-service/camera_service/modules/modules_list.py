import cv2
def test(frame, frame_number):
    # Get the center coordinates of the frame
    center_x = frame.shape[1] // 2
    center_y = frame.shape[0] // 2

    # Draw a circle at the center
    radius = 50
    color = (0, 255, 0)  # BGR color (here, green)
    thickness = 2
    cv2.circle(frame, (center_x, center_y), radius, color, thickness)
    return {"frame": frame}

def test2(frame, frame_number):
    return

modules = [
    # {"name":"test", 'proccessing': test, "options": {"processing_frame": 1}},
    {"name":"test", 'proccessing': test, },
    {"name":"test2", 'proccessing': test2, "options": {"processing_frame": 5}},
    ]
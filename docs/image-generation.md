# 주요 기사 이미지 생성 기록

내장 ImageGen 도구로 2026-10-12에 생성한 시연용 이미지입니다. 실제 영화관·전시장·작품을 촬영한 사진이 아닙니다.
원본 PNG는 `docs/image-originals/`에 보관하고 웹용 WebP는 `src/assets/images/`에 저장했습니다.
WebP는 원본 크기 1672×941을 유지하며 Pillow의 quality=82, method=6으로 변환했습니다.
카테고리별 범용 이미지 3장씩 총 15장을 준비하고, 최신순으로 번갈아 배정해 모든 기사 75개에 이미지 경로와 대체 텍스트를 연결했습니다.
기존 대표 기사 5개의 이미지는 유지했습니다. 각 이미지는 같은 카테고리 기사 5개에서 재사용합니다.

## 공연 — performance-stage.png

Use case: photorealistic-natural. Asset type: landscape editorial image for a Korean culture magazine sample article about recording the lingering impression after a stage performance. Primary request: a quiet empty small theater stage viewed from the audience, dark charcoal seats along the lower foreground, simple unbranded black stage, softly lit deep green curtains at the sides, restrained warm overhead spotlights and a gentle pool of light on the wooden stage floor. Style: believable natural editorial photography, tactile fabrics, realistic lighting, calm contemplative mood, harmonious with warm neutral photographs of a reading corner and intimate gallery. Composition: wide 16:9 single photograph, principal stage centered and useful for mobile cropping. Fictional venue, no actors, no lettering, no logos, no watermark, no poster, no collage, no illustration.

## 음악 — music-listening.png

Use case: photorealistic-natural. Asset type: landscape editorial image for a Korean culture magazine sample article about listening to a complete album at home. Primary request: a quiet modest home listening corner, a realistic unbranded turntable with a black vinyl record and tonearm properly resting on the record, a compact speaker on a lightly worn wooden sideboard, subtle green houseplant in the background, soft warm evening window light. Style: natural editorial photography with realistic wood and vinyl texture, restrained neutral colors, calm personal atmosphere, harmonious with photographs of a reading corner and small gallery. Composition: wide 16:9 single photograph, turntable as central subject, useful for mobile cropping, no people, no headphones, no readable labels or text, no logos, no watermark, no collage, no illustration.


## 영화 — film-cinema.png

Use case: photorealistic-natural. Asset: landscape editorial image for Korean culture magazine sample article 'Scenes that stay after a film'. Generate one natural photographic image, wide 16:9 composition: a quiet empty small cinema seen from the rear, rows of charcoal upholstered seats, softly glowing blank projection screen, subtle aisle light, believable materials and restrained exposure, calm contemplative atmosphere. Main elements remain within central region for mobile crop. No movie still, no identifiable existing venue, no people, no lettering, logos or watermark. Not an illustration or collage.

## 책 — book-reading.png

Use case: photorealistic-natural. Asset: landscape editorial image for Korean culture magazine sample article 'Twenty minutes of reading'. Generate one natural photographic image, wide 16:9 composition: an open book resting on a lightly worn wooden table beside a window, a couple of closed unbranded books nearby, quiet small home reading corner, gentle late afternoon daylight, realistic paper texture, restrained neutral colors and subtle green background foliage. Book text is shallow-focus indistinct texture with no legible text. Main elements centered for mobile crop. No people, logos, watermark, collage or illustration.

## 전시 — exhibition-gallery.png

Use case: photorealistic-natural. Asset: landscape editorial image for Korean culture magazine sample article 'Slowly exploring a small exhibition'. Generate one natural photographic image, wide 16:9 composition: intimate empty contemporary gallery with off-white walls, a few modest framed original nonfigurative abstract artworks, light wood floor, soft daylight and understated ceiling lighting, realistic quiet editorial photography, restrained colors, subtle green accent in one artwork. Entirely fictional venue and invented artwork. Main scene centered for mobile crop. No visitors, signage, readable labels, lettering, logos, watermark, illustration or collage.


## 추가 범용 이미지 10장

### film-projector.webp

Use case: photorealistic-natural. Asset: generic category photograph for a Korean culture magazine demonstration site. Scene: A close three-quarter view of a modern unbranded cinema projector in a dim projection room, lens softly glowing, theater light blurred behind it. Style: realistic restrained editorial photography with natural texture, warm neutral colors, quiet atmosphere, consistent with photographs of a cinema, reading corner, gallery, theater stage and turntable. Composition: one landscape 16:9 photograph, main subject remains within central region for mobile cropping. Fictional location and objects. No people, logos, watermarks, legible text, captions, posters, collage or illustration. Do not depict any identifiable real artwork.

### film-seats.webp

Use case: photorealistic-natural. Asset: generic category photograph for a Korean culture magazine demonstration site. Scene: Side angle of a quiet empty small cinema, rows of charcoal upholstered seats and a softly illuminated aisle, screen outside the frame. Style: realistic restrained editorial photography with natural texture, warm neutral colors, quiet atmosphere, consistent with photographs of a cinema, reading corner, gallery, theater stage and turntable. Composition: one landscape 16:9 photograph, main subject remains within central region for mobile cropping. Fictional location and objects. No people, logos, watermarks, legible text, captions, posters, collage or illustration. Do not depict any identifiable real artwork.

### book-shelf.webp

Use case: photorealistic-natural. Asset: generic category photograph for a Korean culture magazine demonstration site. Scene: A quiet small home library corner with wooden shelves of unbranded books, soft window daylight and a simple reading chair, no readable titles. Style: realistic restrained editorial photography with natural texture, warm neutral colors, quiet atmosphere, consistent with photographs of a cinema, reading corner, gallery, theater stage and turntable. Composition: one landscape 16:9 photograph, main subject remains within central region for mobile cropping. Fictional location and objects. No people, logos, watermarks, legible text, captions, posters, collage or illustration. Do not depict any identifiable real artwork.

### book-stack.webp

Use case: photorealistic-natural. Asset: generic category photograph for a Korean culture magazine demonstration site. Scene: A small stack of plain unbranded books on a wooden desk, one closed linen-bound green book on top, soft daylight, tactile paper edges. Style: realistic restrained editorial photography with natural texture, warm neutral colors, quiet atmosphere, consistent with photographs of a cinema, reading corner, gallery, theater stage and turntable. Composition: one landscape 16:9 photograph, main subject remains within central region for mobile cropping. Fictional location and objects. No people, logos, watermarks, legible text, captions, posters, collage or illustration. Do not depict any identifiable real artwork.

### exhibition-sculpture.webp

Use case: photorealistic-natural. Asset: generic category photograph for a Korean culture magazine demonstration site. Scene: An intimate contemporary gallery containing a simple original abstract stone sculpture on a low plinth, generous open space, soft daylight. Style: realistic restrained editorial photography with natural texture, warm neutral colors, quiet atmosphere, consistent with photographs of a cinema, reading corner, gallery, theater stage and turntable. Composition: one landscape 16:9 photograph, main subject remains within central region for mobile cropping. Fictional location and objects. No people, logos, watermarks, legible text, captions, posters, collage or illustration. Do not depict any identifiable real artwork.

### exhibition-frames.webp

Use case: photorealistic-natural. Asset: generic category photograph for a Korean culture magazine demonstration site. Scene: An oblique view along a gallery wall with three modest framed invented abstract artworks, pale wooden floor and diffuse daylight. Style: realistic restrained editorial photography with natural texture, warm neutral colors, quiet atmosphere, consistent with photographs of a cinema, reading corner, gallery, theater stage and turntable. Composition: one landscape 16:9 photograph, main subject remains within central region for mobile cropping. Fictional location and objects. No people, logos, watermarks, legible text, captions, posters, collage or illustration. Do not depict any identifiable real artwork.

### performance-curtain.webp

Use case: photorealistic-natural. Asset: generic category photograph for a Korean culture magazine demonstration site. Scene: A quiet empty theater viewed toward a fully closed deep green stage curtain, a narrow wooden apron softly lit by warm spotlights. Style: realistic restrained editorial photography with natural texture, warm neutral colors, quiet atmosphere, consistent with photographs of a cinema, reading corner, gallery, theater stage and turntable. Composition: one landscape 16:9 photograph, main subject remains within central region for mobile cropping. Fictional location and objects. No people, logos, watermarks, legible text, captions, posters, collage or illustration. Do not depict any identifiable real artwork.

### performance-lights.webp

Use case: photorealistic-natural. Asset: generic category photograph for a Korean culture magazine demonstration site. Scene: A side angle of an empty small stage with understated warm spotlights, dark backdrop and the edge of a green curtain, no performers. Style: realistic restrained editorial photography with natural texture, warm neutral colors, quiet atmosphere, consistent with photographs of a cinema, reading corner, gallery, theater stage and turntable. Composition: one landscape 16:9 photograph, main subject remains within central region for mobile cropping. Fictional location and objects. No people, logos, watermarks, legible text, captions, posters, collage or illustration. Do not depict any identifiable real artwork.

### music-headphones.webp

Use case: photorealistic-natural. Asset: generic category photograph for a Korean culture magazine demonstration site. Scene: Unbranded over-ear headphones resting beside a simple compact music player on a wooden table in a quiet room, warm window light. Style: realistic restrained editorial photography with natural texture, warm neutral colors, quiet atmosphere, consistent with photographs of a cinema, reading corner, gallery, theater stage and turntable. Composition: one landscape 16:9 photograph, main subject remains within central region for mobile cropping. Fictional location and objects. No people, logos, watermarks, legible text, captions, posters, collage or illustration. Do not depict any identifiable real artwork.

### music-piano.webp

Use case: photorealistic-natural. Asset: generic category photograph for a Korean culture magazine demonstration site. Scene: Close angled view of an unbranded upright piano keyboard in a quiet home room, softly lit wooden surface and subtle green plant in the blurred background. Style: realistic restrained editorial photography with natural texture, warm neutral colors, quiet atmosphere, consistent with photographs of a cinema, reading corner, gallery, theater stage and turntable. Composition: one landscape 16:9 photograph, main subject remains within central region for mobile cropping. Fictional location and objects. No people, logos, watermarks, legible text, captions, posters, collage or illustration. Do not depict any identifiable real artwork.
